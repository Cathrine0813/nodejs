// 作为路由目标的函数称为请求处理程序

var exec = require("child_process").exec;//新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。

//仔细想想，有一大堆东西，每个都要映射到一个字符串（就是请求的URL）上？似乎关联数组（associative array）能完美胜任。
//不过结果有点令人失望，JavaScript没提供关联数组 -- 也可以说它提供了？事实上，在JavaScript中，真正能提供此类功能的是它的对象。
//确定将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到route()函数中。
function start(response) {
    console.log("Request handler 'start' was called")

    // var content = "Hello Start1"
    // function sleep(milliSeconds) {
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    //     content = "Hello Start2"
    // }

    // sleep(10000)//模拟休眠10秒,阻塞操作
    /**
     * Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。
     * 它通过事件轮询（event loop）来实现并行操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
     * 然而，要用非阻塞操作，我们需要使用回调，通过将函数作为参数传递给其他需要花时间做处理的函数（比方说，休眠10秒，或者查询数据库，又或者是进行大量的计算）。
     * 对于Node.js来说，它是这样处理的：“嘿，probablyExpensiveFunction()（译者注：这里指的就是需要花时间处理的函数），你继续处理你的事情，我（Node.js线程）先不等你了，我继续去处理你后面的代码，请你提供一个callbackFunction()，等你处理完之后我会去调用该回调函数的，谢谢！”
     */

    // var content = "empty"

    //------------错误的非阻塞【我们的代码是同步执行的，这就意味着在调用exec()之后，Node.js会立即执行 return content ；在这个时候，content仍然是“empty”，因为传递给exec()的回调函数还未执行到——因为exec()的操作是异步的。
    //exec() 它从Node.js来执行一个shell命令。
    //在上述例子中，我们用它来获取当前目录下所有的文件（“ls-lah”）,然后，当 /start URL请求的时候将文件信息输出到浏览器中。
    // exec("ls-lah", function (error, stdout, stderr) {
    //     content = stdout
    // })
    // return content


    //------------
    exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      console.log(111,stdout)
      response.write('111');
      response.end();
    });
}

function upload(response) {
    console.log("Request handler 'upload' was called")
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
    // return "Hello Upload"
}

function imports(response){
    console.log("Request handler 'imports' was called")
    var body = '<html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/></head>' +
    '<body><form action="/upload" method="post"><textarea name="text" rows="20" cols="60"></textarea><input type="submit" value="Submit text"/></form></body></html>'

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

exports.start = start
exports.upload = upload
exports.imports = imports