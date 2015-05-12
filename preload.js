// NOTE: this libarary uses some ES5 features, you may want to do polyfill if you are targeting
// aged browsers like IE8.

// reference: #http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml
// TODO: failure handler should provide more information (e.g. all failed images)
// 
;(function(window) {	

	var noop = function (){};

	function Preload (arr) {
		if(!(this instanceof Preload)) return new Preload(arr);
		
		this.images = [];
		this.loadedImages = 0;

		var arr = (typeof arr != "object") ? [arr] : arr;
		this.initImages (arr);
	}

	Preload.prototype.initImages = function(arr) {
		var self = this;
		arr.forEach(function (str, i) {
			if(Array.isArray(str)) {
				return self.initImages(str);
			}
			var el  =  new Image();
			el.src = str;
			el.onload = (self._onload).bind(self);
			el.onerror = (self._onerror).bind(self);
			self.images.push(el);
		});
	};

	Preload.prototype._onload = function() {
		this.loadedImages++
		if (this.loadedImages == this.images.length) {
			this._loaded = true;
			this.done();
		}
	};
	Preload.prototype._onerror = function() {		
		if (this._failed) return;
		this._failed = true;
		this.fail();
	};

	thenable(Preload);

	// TODO: unify this? (actually the following snippet is the same as the one in `sound.js`)
	function thenable(obj) {
		function then(done, fail) {
			var self = this;
			// TODO: think of a better way to organize these two:
			this._dones = this._dones || [];
			this._fails = this._fails || [];

			if(done) this._dones.push(done);
			if(fail) this._fails.push(fail);

			if (this._loaded) {
				this._dones.forEach(function (done, i) {
					done(self.images);
				});
				this._dones = [];
				return;
			}
			if (this._failed) {
				this._fails.forEach(function (fail, i) {
					fail();
				});
				this._fails = [];
				return;
			}
			
			return this;
		};

		obj.prototype.then = then;
		obj.prototype.done = function (done) {
			this.then(done, undefined);
			return this;
		};
		obj.prototype.fail = function (fail) {
			this.then(undefined, fail);
			return this;
		};;
	}

	window.Preload = Preload;

})(window);
