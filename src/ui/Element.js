// Common UI related macros
Element.implement({
	setField: function(which, value) {
		var f = this.getElement(which);
		if(!f) return;
		var tn = f.get('tag');
		if(tn == 'input' || tn == 'textarea') f.set('value', value);
		else f.set('html', value);
	},
	readField: function(which) {
		var f = this.getElement(which);
		if(!f) return;
		var tn = f.get('tag');
		if(tn == 'input' || tn == 'textarea') return f.get('value');
		else return f.get('html');
	},
	setChecked: function(which, value) {
		var f = this.getElement(which);
		if(!f) return;
		if(f.get('tag') == 'input' && (f.get('type') == 'checkbox' || f.get('type') == 'radio'))
			f.set('checked', value);
	},
	isChecked: function(which) {
		var f = this.getElement(which);
		if(!f) return;
		if(f.get('tag') == 'input' && (f.get('type') == 'checkbox' || f.get('type') == 'radio'))
			return f.get('checked');
	},
	setClick: function(which, fn) {
		var b = this.getElement(which);
		if(!b) return;
		b.removeEvent('click');
		b.addEvent('click', fn);
	},
	declassSiblings: function(classname) {
		this.getSiblings().each(function(x){x.removeClass(classname);});
	},
	
	
	getUI: function() {
		var ui={};
		var c=this.getElements("*[data-tui]");
		for(var i=0;i<c.length;i++)ui[c[i].get("data-tui")]=c[i];
		c=this.getElements("*[data-tui-type]");
		for(var i=0;i<c.length;i++)c[i].toComponent(Tritium.UI.Components[c[i].get("data-tui-type")]);
		return ui;
	},
	toComponent: function(comp) {
		Object.append(this, comp).initComponent();
	}
});
