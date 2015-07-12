Tritium.UI.Toolbar = new Class({
	Implements: [Options, Events],
	options: {
		parent: document,
		tooldefs: [],
		size: 16,
		data: {},
		callback: function() {},
		'class': 'TritiumToolbar'
	},
	initialize: function(options) {
		var divStrip, toolmenu, tools = {};
		
		this.setOptions(options);
		
		this.id = (new Date()).getTime();
		
		divStrip = new Element('div', {
			id: 'tritool_'+this.id,
			'class': this.options['class']+' '+(this.options.size==24?'i24':'i16'),
			styles: {
				visibility: 'hidden',
				width: '100%',
				position: 'absolute',
				top:0,
				left:0
			}
		});
		
		toolmenu = new Element('ul');
		divStrip.grab(toolmenu);
		
		this.addTool = function(tooldef) {
			this.removeTool(tooldef.id);
			
			var tool = new Element('li').grab(new Element('a', {
				href: 'javascript://',
				title: tooldef.title || '',
				styles: {
					'background-image': 'url(//static.trinityroad.com/img/icons'+(this.options.size==24?'24':'')+'/'+tooldef.icon+'.png)'
				},
				events: {
					click: (function(e) { e.data = this.options.data; e.callback = this.options.callback; tooldef.fn(e); }).bind(this)
				},
				text: (this.options.size==24 ? '' : tooldef.title)
			}));
			
			tools[tooldef.id] = tool;
			toolmenu.grab(tool);
		};
		
		this.removeTool = function(id) {
			if(tools[id]) {
				tools[id].destroy();
				delete tools[id];
			}
		};
		
		
		for(var i = 0; i < this.options.tooldefs.length; i++) {
			this.addTool(this.options.tooldefs[i]);
		}
					
		this.options.parent.grab(divStrip);
		var size = divStrip.getSize();
		this.options.parent.setStyle('padding-top', size.y+4);
		
		divStrip.setStyle('visibility','visible');
	}
});
