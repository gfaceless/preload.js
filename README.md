Preload.js (v0.0.2)
==========
Features
--------
* 预加载 + 加载后回调
* `thennable`，可以直接被浏览器内置`Promise`使用
* 可以判断失败

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
ES6内置`promise`的支持，因为`Preload()`返回的是`thenable`，可以用
`Promise.resolve(Preload(arr))`来得到真正的`promise`
在实际使用中，我们会用一些`promise`的`polyfill`

NOTE
------
* 虽然名字叫的很广，但只支持图片。
* 低版本的浏览器如IE8需要es-5的shim。当然pc端不推荐使用本库

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


