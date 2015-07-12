Tritium.UI.Components = {
	progress: {
		initComponent: function() {
			this.setStyles({position:"relative",height:"1em","background-color":"#999",border:"1px solid #333"});
			var bar = new Element("div",{styles:{position:"absolute",top:0,left:0,"background-color":"#900",height:"1em"}});
			var status = new Element("div",{styles:{position:"absolute",top:"-0.2em",left:0,"text-align":"center","font-size":"0.8em",color:"#fff",width:"100%","vertical-align":"middle"}});
			this.adopt(bar,status);
			
			this.setStatus = function(s) { status.set('text',s); };
			this.setProgress = function(p) { bar.setStyle('width',Math.min(p,100)+'%'); }
			
			return this;
		}
	},
	grid: {
		initComponent: function() {
			
		}
	},
	datechooser: {
		initComponent: function() {
			var dp = new Picker.DatePicker(this);
			this.getComponent = function() { return dp; };
			return dp;
		}
	},
	texteditor: {
		initComponent: function() {
			var te = new Tritium.UI.TextEditor(this);
			this.getComponent = function() { return te; };
			return te;
		}
	}
};
