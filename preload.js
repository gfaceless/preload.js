/**
 * TODO: 目前的返回不是promise，考虑依赖promise库？
 * 或是返回thenable?
 */

//reference: #http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml
;(function(window) {

	function preload(arr) {
		var noop = function() {};
		var images = [],
			loadedImages = 0;
		var anyImgFails;
		var ondone = noop,
			onfail = noop;

		var arr = (typeof arr != "object") ? [arr] : arr

		function onload() {
			loadedImages++
			if (loadedImages == arr.length) {
				ondone(images) //call ondone and pass in images array as parameter
			}
		}

		function onerror() {
			if (anyImgFails) return;
			anyImgFails = true;
			onfail(images);
		}
		for (var i = 0; i < arr.length; i++) {
			images[i] = new Image()
			images[i].src = arr[i]
			images[i].onload = onload;
			images[i].onerror = onerror;
		}
		return {
			done: function(cb) {
				if (cb) ondone = cb;
				return this;
			},
			fail: function(cb) {
				if (cb) onfail = cb;
				return this;
			}
		}
	}
	window.preload = preload;
})(window);
