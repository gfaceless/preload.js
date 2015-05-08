/**
 * 这个动画如果不预加载，效果会很差
 * 把9个拼图的part放进arr，然后传至preload();
 */
var arr = [];
for(var i=0;i<9;i++){
	arr.push("images/part" + (i+1) + ".png")
}

// 类似jquery deferred的接口，未来可能会改成promise thenable的api
preload(arr)
.done(function() {
	startApp();
})
.fail(function(images) {
	console.log('失败了，不启动app');
})


// 动画部分，无关了
function startApp () {
	function genRand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var duration1 = 2000;
	var duration2 = 2000;
	var opts = {
		display: 'auto', 
		easing: "easeOutQuart",
		duration: duration1
	};
	var props;

	$('.jigsaw').velocity('transition.expandIn', {
		duration: 1500,
		complete: function() {
			for(var i=1;i<=9;i++){
				props = {
					translateX: [0, genRand(-200, 200)],
					translateY: [0, genRand(-300, 300)],
					translateZ: [0, genRand(-400, 400)],
					rotateY: [0, genRand(300, 700)]
				}
				$('.part' + i).velocity(props, opts)
			}

			// $('.')
			$('.shadow, .lets-joy, .join-us').velocity({opacity: 1}, 
				{delay: duration1, duration: duration2}
			);
		}
	})


	
}