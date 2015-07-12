// Tools for ui management
// container namespace for UI classes
// closure for ui-related data

Tritium.UI = new ( function() {

	var TritiumDiv;
	
	var layers = [];
	
	var winW = 640, winH = 480;
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
	
	function moveToFront() {
		if(layers[layers.length-1] == this.id) return;
		layers.erase(this.id);
		layers.push(this.id);
		layers.each(function(x, i) {
			document.id('triwin_'+x).setStyle('z-index', 1000+i);
		});
	}
	
	
	// Lightbox
	
	var lightbox_back;
	
	this.showLightbox = function() {
		if(!lightbox_back) {
			lightbox_back = new Element('div', {
				styles: {
					display: 'none',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					'background-color': 'black',
					'z-index': 999,
					'-moz-opacity': 0.33,
					opacity: 0.33,
					filter: 'alpha(opacity=33)'
				}
			});
			lightbox_back.inject(document.id(document.body));
		}
		lightbox_back.show();
	};
	
	this.hideLightbox = function() {
		if(lightbox_back) lightbox_back.hide();
	};
	
	
	// Loading
	
	var loading_pane;
	
	this.showLoading = function() {
		if(!loading_pane) {
			loading_pane = new Element('div', {
				styles: {
					display: 'none',
					position: 'fixed',
					top: Math.abs(Math.ceil((winH - 200) / 2)),
					left: Math.abs(Math.ceil((winW - 200) / 2)),
					width: 200,
					height: 200,
					color: '#fff',
					'font-weight': 'bold',
					'text-align': 'center',
					'vertical-align': 'middle',
					'background-color': '#333',
					'z-index': 2000,
					'border-radius': '1em',
					'-moz-border-radius': '1em',
					'-webkit-border-radius': '1em'
				},
				html: '<div class="TritiumSpinner"><strong>Loading...</strong><span></span></div>'
			});
			//loading_pane.inject(document.id(document.body));
			loading_pane.inject(TritiumDiv);
		}
		loading_pane.show();
	};
	
	this.hideLoading = function() {
		if(loading_pane) loading_pane.hide();
	};
	
	
	
	
	function TritiumInit() {
		TritiumDiv = new Element('div', {id:'TritiumUI'});
		TritiumDiv.inject(document.id(document.body));
		
		if(window.innerWidth && window.innerHeight) {
		 winW = window.innerWidth;
		 winH = window.innerHeight;
		}
	};

	window.addEvent('domready', TritiumInit);

})();
