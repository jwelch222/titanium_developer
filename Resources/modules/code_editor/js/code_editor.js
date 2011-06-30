CodeEditor = {};
//CodeEditor.buttonBar = new TiUI.BlackButtonBar();


//
// Setup main view
//
CodeEditor.setupView = function()
{
	// set default UI state
	TiUI.setBackgroundColor('#06284D');
	TiDev.contentLeft.show();
	TiDev.contentLeftHideButton.show();
	TiDev.contentLeftShowButton.hide();
	
	
	/*
	CodeEditor.buttonBar.configure({id:'tiui_content_submenu',tabs:['<u>S</u>ave',' <img src="ceditor/images/add_folder.png">  Add new Folder ',' <img src="ceditor/images/add_code.png">  Add new File '],active:0});
	CodeEditor.buttonBar.appendContent('<img style="position:absolute;left:15px;top:6px;cursor:pointer" title="refresh" id="feeds_refresh" src="modules/feeds/images/refresh.png"/>');
	
	CodeEditor.buttonBar.addListener(function(idx)
	{
		alert(idx);
		

	});
	*/
	
	
	
	CodeEditor.loadProjectFiles();
	
};

CodeEditor.loadProjectFiles = function()
{
	CodeEditor.currentProject = Projects.getProject();
	var resources = Titanium.Filesystem.getFile(CodeEditor.currentProject.dir,"Resources");
	

	jst_arrNodes = [];
	tmpArr = [];
	
	
	jst_arrNodes.push([]);
	jst_arrNodes[0].push('Resources');
	jst_arrNodes[0].push(['javascript:',,'']);
	
	
	
	function getRecursiveDirectoryListing(file)
	{
		if (file.isDirectory())
		{
			var set = [];
			var children = file.getDirectoryListing();
			for (var i=0;i<children.length;i++)
			{
				var childSet = getRecursiveDirectoryListing(children[i]);
				for (var j=0;j<childSet.length;j++)
				{
					set.push(childSet[j]);
				}
			}
			return [children[i]+'<ul>'+set+'</ul>'];
		}
		else
		{
			sfile=file.nativePath().replace(resources.nativePath()+'/','');
			//return [sfile];
			return ['<li>'+sfile+'</li>'];
		}
	};

	var jobs = getRecursiveDirectoryListing(resources);
alert(jobs);
/*
var tmpArrRoot = [];
for(i=0;i<jobs.length;i++){
	if(jobs[i].indexOf('/')>0){
		
	}else{
		if(jobs[i]!='.DS_Store' && jobs[i]!='.gitignore'){
			sfile=resources.nativePath()+'/'+jobs[i];
			tmpArrRoot.push([jobs[i],['javascript:CodeEditor.edit("'+sfile+'")',,CodeEditor.ext(jobs[i])]]);
		}
	}
}

jst_arrNodes[0].push(tmpArrRoot);
*/

/*
	jst_arrNodes = [
		['Resources', [''],
			[
			
				['Characters', ['javascript:_foo()',,'folder'],
					[
						['Homer Simpson', ['javascript:alert("No!")',,'code']],
						['Maggie Simpson', ['javascript:alert("snhk snhk!")',,'text']]
					]
	
			
				]
			]
		]
	];
*/

	alert(Titanium.JSON.stringify(jst_arrNodes));

	renderTree('tiui_content_left_body');
};


CodeEditor.ext = function(t)
{
	r = 'file';
	e = t.toLowerCase().split('.').pop();
	if(e=='png' || e=='jpg' || e=='gif'){
		r = 'picture';
	}
	if(e=='mp3' || e=='aac' || e=='m4a' || e=='ogg' || e=='webm'){
		r = 'music';
	}
	if(e=='mov' || e=='mp4' || e=='m4v'){
		r = 'movie';
	}
	if(e=='js' || e=='jss'){
		r = 'code';
	}
	if(e=='html' || e=='htm'){
		r = 'html';
	}
	if(e=='css'){
		r = 'css';
	}
	if(e=='pdf'){
		r = 'pdf';
	}
	if(e=='xml'){
		r = 'xml';
	}
	if(e=='txt'){
		r = 'txt';
	}
	if(e=='json'){
		r = 'json';
	}
	if(e=='py'){
		r = 'python';
	}
	if(e=='rb'){
		r = 'ruby';
	}
	if(e=='php'){
		r = 'php';
	}
	return r;
}


CodeEditor.edit = function(file)
{
	document.getElementById('codeeditor').innerHTML='';
	if(CodeEditor.ext(file)=='css' || CodeEditor.ext(file)=='html' || CodeEditor.ext(file)=='code' || CodeEditor.ext(file)=='json' || CodeEditor.ext(file)=='php' || CodeEditor.ext(file)=='python' || CodeEditor.ext(file)=='ruby' || CodeEditor.ext(file)=='xml'){
	
		var ofile = Titanium.Filesystem.getFile(file);
		str = ofile.read();
		str = str.toString();
		str = str.replace(/</g,'&lt;');
		str = str.replace(/>/g,'&gt;');
		document.getElementById('codeeditor').innerHTML=str;


		var aceeditor = ace.edit("codeeditor");
		aceeditor.renderer.setShowPrintMargin(false);
		aceeditor.renderer.setShowGutter(true);
	    aceeditor.setTheme("ace/theme/twilight");


	    var cssMode = require("ace/mode/css").Mode;
		var htmlMode = require("ace/mode/html").Mode;
		var javascriptMode = require("ace/mode/javascript").Mode;
		var jsonMode = require("ace/mode/json").Mode;
		var phpMode = require("ace/mode/php").Mode;
		var pythonMode = require("ace/mode/python").Mode;
		var rubyMode = require("ace/mode/ruby").Mode;
		var xmlMode = require("ace/mode/xml").Mode;

		if(CodeEditor.ext(file)=='css'){
			aceeditor.getSession().setMode(new cssMode());
		}
		if(CodeEditor.ext(file)=='html'){
			aceeditor.getSession().setMode(new htmlMode());
		}
		if(CodeEditor.ext(file)=='code'){
			aceeditor.getSession().setMode(new javascriptMode());
		}
		if(CodeEditor.ext(file)=='json'){
			aceeditor.getSession().setMode(new jsonMode());
		}
		if(CodeEditor.ext(file)=='php'){
			aceeditor.getSession().setMode(new phpMode());
		}
		if(CodeEditor.ext(file)=='python'){
			aceeditor.getSession().setMode(new pythonMode());
		}
		if(CodeEditor.ext(file)=='ruby'){
			aceeditor.getSession().setMode(new rubyMode());
		}
		if(CodeEditor.ext(file)=='xml'){
			aceeditor.getSession().setMode(new xmlMode());
		}	

	
	}else{
		if(CodeEditor.ext(file)=='music'){
			document.getElementById('codeeditor').innerHTML='<audio style="width:100%;" src="file://'+file+'" controls="controls"></audio>';
		}
		if(CodeEditor.ext(file)=='movie'){
			document.getElementById('codeeditor').innerHTML='<video src="file://'+file+'" controls="controls"></video>';
		}
		if(CodeEditor.ext(file)=='picture'){
			document.getElementById('codeeditor').innerHTML='<img src="file://'+file+'" />';
		}
	}
	if(document.getElementById('codeeditor').innerHTML==''){
		alert('This type of file cannot be edited');
	}

}




// setup event handler
CodeEditor.eventHandler = function(event)
{
	if (event == 'focus')
	{
		CodeEditor.setupView();
	}
	else if (event == 'load')
	{
		CodeEditor.setupView();
	}
	else if (event == 'blur')
	{
		//CodeEditor.buttonBar.hide();
	}
};


// register module
TiDev.registerModule({
	name:'code_editor',
	displayName: 'Code <u>E</u>ditor',
	perspectives:['projects'],
	html:'code_editor.html',
	idx:3,
	callback:CodeEditor.eventHandler
});
