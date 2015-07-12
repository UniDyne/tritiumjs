Tritium.UI.Dialog = new Class({
	Implements: [Options, Events],
	options: {
		title: '',
		width: 'auto',
		x: Math.ceil(window.getSize().x * 0.5),
		y: Math.ceil(window.getSize().y * 0.5),
		center: false,
		centerx: true,
		centery: true,
		lightbox: false,
		hideonclick: false,
		level: 2000 + layers.length
	},
	initialize: function(options) {
		var divWindow, divContainer;
		
		this.setOptions(options);
		
		this.id = (new Date()).getTime();
		//layers.push(this.id);
		
		divWindow = new Element('div', {
			id: 'triwin_'+this.id,
			'class': 'TritiumDialog',
			styles: {
				visibility: 'hidden',
				width: this.options.width,
				top: this.options.y,
				left: this.options.x,
				'z-index': this.options.level
			}
		});
		
		divContainer = new Element('div', {
			'class': 'TritiumPanel'
		});
		
		divWindow.adopt(
			new Element('div', {
				'class': 'DlogTitle',
				html: '<span>'+this.options.title+'</span>'
			}),
			(new Element('div', {
				styles: {
					position: 'absolute',
					top: 2,
					right: 2, 
					'z-index': 6
				}
			})).grab(
				new Element('a', {
					href: 'javascript://',
					events: {
						click: (function() {
							this.fireEvent('cancel');
							this.close();
						}).bind(this)
					},
					html: '<img width="16" border="0" height="16" alt="Close Popup" src="//static.trinityroad.com/img/ui/close16.png" />'
				})
			),
			divContainer
		);
		divWindow.inject(TritiumDiv);
		
		
		
		this.show = function() {
			var size = divWindow.getSize();
			var win = window.getSize();
			if(this.options.center) {
				divWindow.setStyles({
					left: Math.abs(Math.ceil((win.x - size.x) * 0.5)),
					top: Math.abs(Math.ceil((win.y - size.y) * 0.5))
				});
			} else {
				divWindow.setStyles({
					left: this.options.centerx ? Math.abs(this.options.x - Math.ceil(size.x * 0.5)) : Math.abs(this.options.x),
					top: this.options.centery ? Math.abs(this.options.y - Math.ceil(size.y * 0.5)) : Math.abs(this.options.y)
				});
			}
			if(this.options.lightbox) {
				TritiumUI.showLightbox();
				if(this.options.hideonclick)
					lightbox_back.addEvent('click', this.hide.bind(this));
			}
			divWindow.setStyle('visibility','visible');
			if(this.options.hideonclick) divWindow.addEvent('click', this.hide.bind(this));
		};
		this.hide = function() {
			divWindow.hide();
			if(this.options.lightbox) {
				TritiumUI.hideLightbox();
				if(this.options.hideonclick)
					lightbox_back.removeEvent('click');
			}
		};
		this.recenter = function() { 
			var size = divWindow.getSize();
			var win = window.getSize();
			var x, y;
			
//				if(size.x >= win.x || size.y >= win.y) {
//					x = 0;
//					y = 0;
//				} else {
				x = Math.max(Math.ceil((win.x - size.x) * 0.5),0);
				y = Math.max(Math.ceil((win.y - size.y) * 0.5),0);
//				}
			
			divWindow.setStyles({
				left: x,
				top: y
			});
		};
		this.close = function() {
			this.fireEvent('close');
			//layers.erase(this.id);
			divWindow.hide();
			divWindow.destroy();
			if(this.options.lightbox) TritiumUI.hideLightbox();
		};
		this.getContainer = function() { return divContainer; };
	}
});
