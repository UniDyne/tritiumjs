Tritium.UI.Panel = new Class({
	Implements: [Options],
	options: {
		name: '',
		group: false
	},
	initialize: function(options) {
		var divPanel;
		
		this.setOptions(options);
		
		if(this.options.group) {
			divPanel = new Element('fieldset', {
				'class': 'TritiumGroup',
				html: '<legend>'+this.options.name+'</legend>'	
			});
		} else {
			divPanel = new Element('div', {
				'class': 'TritiumPanel'
			});
		}
		
		this.toElement = function() { return divPanel; }
	}
});
