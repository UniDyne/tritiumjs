Tritium.UI.Window = new Class({
		Implements: [Options, Events],
		options: {
			title: '',
			icon: '//static.trinityroad.com/img/icons/application.png',
			width: 'auto',
			x: Math.ceil(window.getSize().x * 0.5),
			y: Math.ceil(window.getSize().y * 0.5),
			center: false,
			centerx: true,
			centery: true,
			resize: false,
			level: 1000 + layers.length
		},
		initialize: function(options) {
			var divWindow;
			var divContainer;
			var btnClose, divClose;
			var dragger;
			
			this.setOptions(options);
			this.id = (new Date()).getTime();
			layers.push(this.id);
			
			divWindow = new Element('div', {
				id: 'triwin_'+this.id,
				'class': 'TritiumWindow',
				styles: {
					visibility: 'hidden',
					width: this.options.width,
					'z-index': this.options.level,
					top: this.options.y,
					left: this.options.x
				}
			});
	
			divContainer = new Element('div', {
				'class': 'TritiumPanel'
			});
			
			if(this.options.icon.substr(0,3) == "fa-") {
				divTitle = new Element('div', {
					'class': 'WinTitle',
					html: '<span style="padding:0.1em"><i class="fa '+this.options.icon+' fa-lg"></i> '+this.options.title+'</span>'
				});
			} else {
				divTitle = new Element('div', {
					'class': 'WinTitle',
					html: '<span>'+this.options.title+'</span>',
					styles: {
						'background-image': 'url('+this.options.icon+')'
					}
				});
			}
	
			btnClose = new Element('a', {
				href: 'javascript://',
				events: {
					click: (function() {
						this.close();
						//this.fireEvent('close');
						//divWindow.destroy();
					}).bind(this)
				},
				html: '<img width="16" border="0" height="16" alt="Close Popup" src="//static.trinityroad.com/img/ui/close16.png" />'
			});
	
			divClose = new Element('div', {
				styles: {
					position: 'absolute',
					top: 2,
					right: 2
				}
			});
	
			divTitle.inject(divWindow);
			btnClose.inject(divClose);
			divClose.inject(divWindow);
			divContainer.inject(divWindow);
			//divWindow.inject(document.id(document.body));
			divWindow.inject(TritiumDiv);
			
			divWindow.addEvent('click', moveToFront.bind(this));
			
			dragger = new Drag(divWindow, {handle: divTitle});
			if(this.options.resize) divWindow.makeResizable();
			
			
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
						top: this.options.centery ? Math.abs(this.options.y - Math.ceil(size.y * 0.5)) : Math.abs(this.options.y), 
						width: size.x 
					});
				}
				divWindow.setStyle('visibility','visible');
				
				moveToFront.delay(250, this);
			};
			this.hide = function() { divWindow.hide(); };
			this.close = function() { this.fireEvent('close'); layers.erase(this.id); divWindow.hide(); divWindow.destroy(); };

			this.recenter = function() { 
				var size = divWindow.getSize();
				var win = window.getSize();
				var x, y;
				
				if(size.x >= win.x || size.y >= win.y) {
					x = 0;
					y = 0;
				} else {
					x = Math.abs(Math.ceil((win.x - size.x) * 0.5));
					y = Math.abs(Math.ceil((win.y - size.y) * 0.5));
				}
				
				divWindow.setStyles({
					left: x,
					top: y
				});
			};

			this.center = function() { 
				var size = divWindow.getSize();
				var win = window.getSize();
				divWindow.setStyles({
					left: Math.abs(Math.ceil((win.x - size.x) * 0.5)),
					top: Math.abs(Math.ceil((win.y - size.y) * 0.5))
				});
			};

			this.getContainer = function() { return divContainer; };
		}
});
