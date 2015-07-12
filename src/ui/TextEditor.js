Tritium.UI.TextEditor = new Class({
	Implements: [Events, Options],
	
	options: {
		imageHandler: null,
		linkHandler: null
	},
	
	initialize: function(container, options) {
		this.setOptions(options);
		this.container = document.id(container);
		
		this.ui = {};
		
		if(!this.container) return;
		
		this.render();
		this.reset();
	},
	
	render: function() {
		this.container.setStyle('position','relative');
		
		this.renderToolbar();
		
		this.renderTextarea();
		
	},
	
	renderToolbar: function() {
		this.toolbar = new Element('div', {
				styles: {
					'font-family': 'FontAwesome',
					height: '2em',
					border:'1px solid #999',
					background:'#ddd'
				}
		}).inject(this.container);
		
		
		var commander = (function(e) {
				var target = (e.target.tagName == "I") ? e.target.getParent() : e.target;
				var role = target.get('data-role');
				switch(role) {
					case 'h1':
					case 'h2':
					case 'p':
						document.execCommand('formatBlock',false,role);
						break;
					case 'createLink':
						var u = null;
						if(this.options.linkHandler == null) {
							var u = window.prompt("Enter the URL to link:","http://");
							document.execCommand('createLink', false, u);
						} else {
							
							// need to save cursor position...
							this.options.linkHandler(function(uri){
								document.execCommand('createLink', false, uri);
							});
						}
						
						break;
					case 'insertImage':
						
						if(this.options.imageHandler == null) {
							var u = window.prompt("Enter the URL for the image:","http://");
							document.execCommand('insertImage',null,u);
						} else {
							
							// need to save cursor position...
							this.options.imageHandler(function(uri){
								document.execCommand('insertImage',false,uri);
							});
						}
						
						break;
					default:
						document.execCommand(role,false,null);
						break;
				}
			}).bind(this);
		
		// add buttons to toolbar...
		[
			{cmd:'undo',icon:'undo'},
			{cmd:'redo',icon:'repeat'},
			
			{cmd:'cut',icon:'cut'},
			{cmd:'copy',icon:'copy'},
			{cmd:'paste',icon:'paste'},
			
			{cmd:'bold',icon:'bold'},
			{cmd:'italic',icon:'italic'},
			{cmd:'underline',icon:'underline'},
			{cmd:'strikeThrough',icon:'strikethrough'},
			
			{cmd:'createLink',icon:'link'},
			{cmd:'unlink',icon:'unlink'},
			{cmd:'insertImage',icon:'picture-o'},
			
			{cmd:'justifyLeft',icon:'align-left'},
			{cmd:'justifyCenter',icon:'align-center'},
			{cmd:'justifyRight',icon:'align-right'},
			{cmd:'justifyFull',icon:'align-justify'},
			
			{cmd:'indent',icon:'indent'},
			{cmd:'outdent',icon:'outdent'},
			
			{cmd:'insertUnorderedList',icon:'list-ul'},
			{cmd:'insertOrderedList',icon:'list-ol'},
			
			{cmd:'subscript',icon:'subscript'},
			{cmd:'superscript',icon:'superscript'}
		].each(function(fn,i,fns){
				new Element('a',{
						href:'javascript:void(0)',
						'data-role':fn.cmd,
						styles: {
							margin:'0.25em'
						},
						events: {
							click: commander
						}
				}).adopt(
					new Element('i',{'class':'fa fa-'+fn.icon})
				).inject(this.toolbar);
		},this);
			
	},
	
	renderTextarea: function() {
		var box = new Element('div',{
				styles: {
					height: this.container.getSize().y - this.toolbar.getSize().y - 2,
					border:'1px solid #999',
					background: '#fff',
					padding:'1em',
					'overflow-y':'auto',
					'overflow-x':'hidden'
				}
		}).inject(this.container);
		
		this.textarea = new Element('div', {
				contenteditable: true,
				styles: {
					'min-height':'50%',
					//padding:'1em',
					overflow: 'visible'
				}
		}).inject(box);
	},
	
	reset: function() {
		
	},
	
	getContent: function() {
		return this.textarea.get('html');
	},
	
	setContent: function(content) {
		this.textarea.set('html', content);
	}
});
