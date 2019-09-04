var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")

//handle并不仅仅是一个“东西”（一些请求处理程序的集合），建议以一个动词作为其命名，这样做可以让我们在路由中使用更流畅的表达式
var handle = {}
//将不同的URL映射到相同的请求处理程序上是很容易的：只要在对象中添加一个键为"/"的属性，对应requestHandlers.start即可，
//这样我们就可以干净简洁地配置 /start和 / 的请求都交由start这一处理程序处理。
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.star(router.route, handle)