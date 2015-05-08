##preload.js
* 预加载 + 加载后回调
* 可以判断失败
* 只支持图片


我们不准备继续使用`imageLoaded`了，因为
1. 不支持`background-image`
see [#issue](https://github.com/desandro/imagesloaded/issues/29)
2. 不支持预加载
3. 只支持`jquery`，不支持`zepto`。(一直以来用的都是我的改源代码的版本才支持的) 

`imagesLoaded`仍然推荐在pc端使用。其battle-tested覆盖性能够很好的解决各种缓存判断问题
但在mobile端，我们决定写自己imagesLoaded
用例见demo