Preload.js (v0.0.2)
==========
Features
--------
* 预加载 + 加载后回调
* `thennable`，可以直接被浏览器内置`Promise`使用
* 可以判断失败
* 只支持图片

API
-------
```javascript
Preload(["some", "image", "urls"])
.done(function(){
	startYourApp();
})
.fail(function(){
	maybeLogYourError();
});
```

Background
----------
我们不准备继续使用`imagesLoaded`了，因为
1. 不支持`background-image`
see [#issue](https://github.com/desandro/imagesloaded/issues/29)
2. 不支持预加载
3. 只支持`jquery`，不支持`zepto`。(一直以来用的都是我的改源代码的版本才支持的) 

`imagesLoaded`仍然推荐在pc端使用。其battle-tested覆盖性能够很好的解决各种缓存判断问题。但在mobile端，我们决定写自己的imagesLoaded 

Changelog
---------
v0.0.2 make api thennable, added multi-dimensional array support

Examples
--------
见demo


