// Extensions to MooTools Request

Class.refactor(Request, {
	// because MT always processes when mime type is JS
	processScripts: function(text) {
		if (this.options.evalResponse) return Browser.exec(text);
		return text.stripScripts(this.options.evalScripts);
	}
});


Request.implement({
	send : function(options){
		if (!this.check(options)) return this;
		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.running = true;

		//var type = $type(options);
		var type = typeOf(options);
		if (type == 'element') options = {data: options.toQueryString().parseQueryString()};
		if (type == 'string') options = {data: options.parseQueryString()};

		var old = this.options;
		//options = $extend({data: old.data, url: old.url, method: old.method}, options);
		options = Object.merge({data: old.data, url: old.url, method: old.method}, options);
		var data = options.data, url = String(options.url), method = options.method.toLowerCase();
		
		if (this.options.format) data.format = this.options.format;
		
		if (this.options.emulation && !['get', 'post'].contains(method)){
			data._method = method;
			method = 'post';
		}
		
		if (this.options.urlEncoded && method == 'post'){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.setHeader('Content-type', 'application/x-www-form-urlencoded' + encoding);
		}
		
		if(this.options.noCache) data.noCache = new Date().getTime();
		
		if(data && this.options.jsonEncoded && method == 'post'){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.setHeader('Content-type', 'application/json' + encoding);
			if(this.xhr.overrideMimeType) /* IE does not support */
				this.xhr.overrideMimeType('application/json' + encoding);
			data = JSON.encode(data);
		} else if(data) {
			data = data.toQueryString();
		}
		
		var trimPosition = url.lastIndexOf('/');
		if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);

		if (data && method == 'get'){
			url = url + (url.contains('?') ? '&' : '?') + data;
			data = null;
		}
		
		this.xhr.open(method.toUpperCase(), url, this.options.async);
		this.xhr.onreadystatechange = this.onStateChange.bind(this);

//		Object.each(this.headers, function(value, key){
//				try {
//					this.xhr.setRequestHeader(key, value);
//				} catch (e){
//					this.fireEvent('exception', [key, value]);
//				}
//			}, this);

		this.fireEvent('request');
		this.xhr.send(data);
		if (!this.options.async) this.onStateChange();
		return this;
	}
});
