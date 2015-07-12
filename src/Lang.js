// Language extensions


Array.implement({
	getFirst: function() {
		return this.length == 0 ? null : this[0];
	},
	
	getLast: function() {
		return this.length == 0 ? null : this[this.length - 1];
	},
	
	unique: function() {
		var a=[];
		for(var i=0;i<this.length;i++)if(a.indexOf(this[i])<0)a.push(this[i]);
		return a;
	}
});


Date.implement({
	clone: function() {
		return new Date(this.getTime());
	},
	daysUntil: function (d) {
		return Math.ceil((d.getTime() - this.getTime()) / (1000*60*60*24));
	},
	 addDays: function (n) {
		this.setDate(this.getDate() + n);
		return this;
	 }
});


String.implement({
	fillin: function(obj) {
		return Template.execStatic(this, obj);
	},
	
	startsWith: function(s) { return (this.match("^"+s)==s); }
});
