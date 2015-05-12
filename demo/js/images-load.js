
function getImageSrc() {
	
	var size = Math.random() * 3 + 1;
	var width = Math.random() * 110 + 100;
	width = Math.round(width * size);
	var height = Math.round(140 * size);
	var rando = Math.ceil(Math.random() * 1000);
	// 1% chance of broken image src
	// random parameter to prevent cached images
	var src = rando < 10 ? '//foo/broken-' + rando + '.jpg' :
		// use lorempixel for great random images
		'//lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
	return src;
}

function genSrcArr(n){
	n = n || 5;
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(getImageSrc());
	};
	console.log(arr);
	return arr;
}



function doSequence (selector) {
	var $c = $(selector);
	var promises = [];
	var preload;
	for (var i = 0; i < 5; i++) {
		preload = Preload(getImageSrc());
		promises.push(Promise.resolve(preload));
	};

	return promises.reduce(function(sequence, promise) {
		return sequence.then(function() {
			return promise;
		}).then(function(img) {
			$c.append(img);
		}, function() {
			$c.append('<img src="fail"></img>');
		})
	}, Promise.resolve());	

}


var p1 = Preload(genSrcArr())

Promise.resolve(p1).then(function(images) {
	$('.child1').append(images);
}, function() {
	alert('some image was broken! (but we still continue)');

})
.then(function() {
	return doSequence(".child2");
})
.then(function() {	
	return doSequence(".child3");
})