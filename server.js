// http服务

//（require）Node.js自带的 http 模块，并且把它赋值给 http 变量
var http = require('http')
var url = require('url')

function star(route, handle) {
    function onRequest(request, response) {
        var postData = '';
        var pathname = url.parse(request.url).pathname;//浏览器请求的URL路径
        //得以使用路由来将请求 以URL路径为基准 映射到处理程序上
        console.log("Request for " + pathname + " received.");

        // //1、设置了接收数据的编码格式为UTF-8
        // request.setEncoding("utf8");//这部分node-formidable自身会处理
        // //2、注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量，
        // request.addListener("data", function (postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk" + postDataChunk + ".")
        // })
        // //3、将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次。
        // //我们同时还把POST数据传递给请求路由，因为这些数据，请求处理程序会用到。
        // request.addListener("end", function () {
        //     route(handle, pathname,response, postData)
        // })

        route(handle, pathname, response, request)
        

        // response.writeHead(200, { "Content-Type": "text/plain" });
        
        // var content = route(handle, pathname)
        // response.write(content);
        // response.end();
    }

    http.createServer(onRequest).listen(8888);



    /**
     * 向 createServer 函数传递了一个匿名函数
     * 基于事件驱动的回调
     * 因为node是单线程，多次请求时参数是函数的话都会执行，局部作用域，
     *
     * 我们创建了服务器，并且向创建它的方法传递了一个函数。无论何时我们的服务器收到一个请求，这个函数就会被调用。
     */
    //http模块提供的函数： createServer 。
    //这个函数会返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个HTTP服务器监听的端口号。
    // http.createServer(function (request, response) {
    //     console.log("Request received.");
    //     response.writeHead(200, { "Content-type": "text/plain" })//发送一个HTTP状态200和HTTP头的内容类型（content-type）
    //     response.write("Hello world 2")//HTTP相应主体中发送文本“Hello World"。
    //     response.end()//完成响应
    // }).listen(8888)
    //终端运行node server.js，打开浏览器访问http://localhost:8888/

    // 在创建完服务器之后，即使没有HTTP请求进来、我们的回调函数也没有被调用的情况下，我们的代码还继续有效
    console.log("Server has started.");



    // 当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。
    //那是因为大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico    
}


// 导出模块
exports.star = star