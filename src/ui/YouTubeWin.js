
Tritium.UI.YouTubeWin = new Class({
	Extends: Tritium.UI.Window,
	options: {
		width: 'auto',
		icon: '//static.trinityroad.com/img/icons/monitor.png',
		video: 'dQw4w9WgXcQ'
	},
	initialize: function(options) {
		this.parent(options);
		
		var cont = this.getContainer();
		cont.set('html', '<iframe width="560" height="315" src="http://www.youtube.com/embed/'+this.options.video+'" frameborder="0" allowfullscreen="true" ></iframe>');
		
		this.show();
	}
});
