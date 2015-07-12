var Tritium = {
	fetch: function(svc, fn, p) {
		var x = null; h = '';
		if(Tritium.pagedata && Tritium.pagedata.hostname) h = '//'+Tritium.pagedata.hostname;
		new Request.JSON({
			url: h+'/ajax/'+svc+'/'+fn,
			jsonEncoded: true,
			async: false,
			onSuccess: function(res) {x=res;},
			onStateChange: function() {}
		}).post(p);
		return x;
	},
	
	loadScript: function(url,ele) {
		ele=(ele==null)?document.getElementsByTagName("head")[0]:ele;
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.async = true;
		if(s.readyState) s.onreadystatechange = function () {if(s.readyState == "loaded" || s.readyState == "complete") {s.onreadystatechange = null;}};
		else s.onload = function () {};
		s.src = url;
		ele.appendChild(s);
	},
	
	vars: {}
};
