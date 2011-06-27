CodeEditor = {};
CodeEditor.buttonBar = new TiUI.BlackButtonBar();


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
	
	
	//
	CodeEditor.buttonBar.configure({id:'tiui_content_submenu',tabs:['btn1','bnt2','btn3'],active:0});
	CodeEditor.buttonBar.appendContent('<img style="position:absolute;left:15px;top:6px;cursor:pointer" title="refresh" id="feeds_refresh" src="modules/feeds/images/refresh.png"/>');
	
	CodeEditor.buttonBar.addListener(function(idx)
	{
		alert(idx);
		

	});
	
	

	// Editor
	var aceeditor = ace.edit("codeeditor");
	aceeditor.renderer.setShowPrintMargin(false);
	aceeditor.renderer.setShowGutter(true);
	
    aceeditor.setTheme("ace/theme/twilight");
    
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    aceeditor.getSession().setMode(new JavaScriptMode());



	
	
	
};





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
		CodeEditor.buttonBar.hide();
	}
};


// register module
TiDev.registerModule({
	name:'code_editor',
	displayName: 'Code <u>E</u>ditor',
	perspectives:['projects'],
	html:'code_editor.html',
	idx:3,
	//active:true,
	callback:CodeEditor.eventHandler
});
