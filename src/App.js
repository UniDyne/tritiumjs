

/** Dynamic Loader **/
// id, js, ui (htm)
// collection of apps...
// launch event/entry point
//

Tritium.App = {};

Tritium.App.Registry = new (function() {
	var _registry = {};
	
	function load(def) {
		// request both parts of app
		// whichever one finishes last will call link()
		
		// get the ui
		new Request({
			url: def.ui,
			method: 'get',
			async: true,
			onSuccess: function(txt) {
				def.tmpl = txt;
				if(def.impl) link(def);
			}
		}).send();
		
		// get the logic
		new Request({
			url: def.js,
			method: 'get',
			async: true,
			evalScripts: false,
			evalResponse: false,
			onSuccess: function(txt) {
				def.impl = new Class(eval("x = "+txt+";x;"));
				if(def.tmpl) link(def);
			}
		}).send();
	}
	
	function link(def) {
		def.app = new Class({
			Extends: Tritium.UI.Window,
			Implements: [Options,Events,def.impl],
			options: {
//				title: def.name,
				def: def
			},
			initialize: function(options) {
				this.parent(options);
				
				if(this.renderUI) this.renderUI();
				else this.getContainer().set('html',def.tmpl);
				
				this.ui = this.getContainer().getUI();
				
				if(this.start) this.start();
				else this.show();
			}
		});
		
		// deferred execution needed?
		start(def.app);
	}
	
	// wrapper... add options?
	function start(app) { new app(); }
	
	this.register = function(def) { _registry[def.id] = def; };
	
	this.instance = function(id) {
		if(!_registry[id]) return false;
		if(!_registry[id].app) load(_registry[id]);
		else start(_registry[id].app);
		return true;
	};
})();
