Tritium.UI.Notifier = new Class({
	Implements: [Options, Events],
	
	options: {
		duration: 8000,
		position: 'lowerRight',
		container: null,
	//	margin: {x: 10, y: 10},
	//	offset: 10,
		className: 'roar',
		colors: {
			normal: 'rgba(0,0,0,0.7)',
			error: 'rgba(127,0,0,0.7)',
			warning: 'rgba(127,127,0,0.7)',
			success: 'rgba(0,127,0,0.7)',
			info: 'rgba(0,0,127,0.7)'
		},
		onShow: function(){},
		onHide: function(){},
		onRender: function(){}
	},
	
	initialize: function(options) {
		this.setOptions(options);
		this.items = [];
		this.container = document.id(this.options.container) || document;
	},
	
	// public method for notification
	alert: function(title, message, mode) {
		var items = [new Element('h3', {html:[title,''].pick(),styles:{margin:0,padding:0,'font-weight':'bold','font-size':'1.2em',color:'inherit'}})];
		if(message) items.push(new Element('p', {html:message,styles:{margin:0,padding:0,'font-weight':'normal','font-size':'1em',color:'inherit'}}));
		this.inject(items, mode);
	},
	
	// injects notification and handles the actual display
	inject: function(elements, mode) {
		if(!this.body) this.initDisplay();
		if(!Type.isString(mode)) mode = 'normal';
		
		var color = [this.options.colors[mode],'rgba(0,0,0,0.7)'].pick();
		
		var item = new Element('div', {
			'class': this.options.className + ' ' + mode,
			styles: {
				display: 'none',
				opacity: 1,
				position: 'static',
				width: '25em',
				'border-radius': '0.5em',
				margin: '1em',
				padding: '1em',
//					'background-color': color,
				color: '#fff',
				clear: 'both'
			}
		}).adopt(elements);
		
		try { item.setStyle('background-color',color); }
		catch(e) { item.setStyle('background-color','#000'); }
		
		
		var remove = this.remove.pass([item], this);
		
		item.addEvent('click', remove);
		
		if(this.options.duration) {
			var over = false;
			var trigger = (function() {
				trigger = null;
				if(!over) remove();
			}).delay(this.options.duration);
			item.addEvents({
				mouseover: function() {
					over = true;
					var pos = item.getPosition(this.body);
					item.setStyles({
						position: 'fixed',
						top: pos.y,
						left: pos.x
					});
				},
				mouseout: function() {
					over = false;
					item.setStyles({position: 'static'});
					if(!trigger) remove.delay(100);
				}
			});
		}
		
		// add this notification to the array
		this.items.push(item);
		
		item.inject(this.body, this.position.y);
		item.reveal();
		
		return this.fireEvent('onShow', [item, this.items.length]);
	},
	
	remove: function(item) {
		var index = this.items.indexOf(item);
		if(index == -1) return this;
		
		this.items.splice(index, 1);
		item.removeEvents();
		
		item.nix({duration:1000},true); // requires MooTools More w/ Fx.Reveal
		
		return this.fireEvent('onHide', [item, this.items.length]);
	},
	
	// places notification area on screen
	initDisplay: function() {
		this.position = this.options.position;
		
		// position could be an x/y pair or a position name
		if(Type.isString(this.options.position)) {
			var position = { x: 'center', y: 'center' };
			this.align = { x: 'left', y: 'top' };
			if ((/left|west/i).test(this.position)) position.x = 'left';
			else if ((/right|east/i).test(this.position)) this.align.x = position.x = 'right';
			if ((/upper|top|north/i).test(this.position)) position.y = 'top';
			else if ((/bottom|lower|south/i).test(this.position)) this.align.y = position.y = 'bottom';
			this.position = position;
		}
		
		var styles = {
			'z-index': 10000,
			display: 'block',
			position: 'fixed',
			background: 'none',
			'pointer-events': 'none',
			width: 'auto',
			height: 'auto',
			'float': 'left',
			clear: 'both',
			width: '29em'
		};
		
		if(this.position.x == 'left') styles['left'] = 0;
		if(this.position.x == 'right') styles['right'] = 0;
		if(this.position.y == 'top') styles['top'] = 0;
		if(this.position.y == 'bottom') styles['bottom'] = 0;
		
		
		// put this in Tritium UI div...
		this.body = new Element('div', {
			'class': 'notifier',
			styles: styles
		}).inject(TritiumDiv);
	}
});
