// 路由模块
// function route(handle, pathname, response, postData) {
function route(handle, pathname, response, request) {
    console.log("About to route a request for" + pathname)
    if (typeof handle[pathname] === 'function') {
        // handle[pathname](response, postData)
        handle[pathname](response, request)
        // return handle[pathname]()
    } else {
        console.log("No request handler found for" + pathname)

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();

        // return "404 Not found"        
    }
}

exports.route = route