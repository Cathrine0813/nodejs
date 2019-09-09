var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });

        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
}).listen(8080);

// received upload:

// { fields: { title: 'Hello World' },
//   files:
//    { upload:
//       { size: 1558,
//         path: '/tmp/1c747974a27a6292743669e91f29350b',
//         name: 'us-flag.png',
//         type: 'image/png',
//         lastModifiedDate: Tue, 21 Jun 2011 07:02:41 GMT,
//         _writeStream: [Object],
//         length: [Getter],
//         filename: [Getter],
//         mime: [Getter] } } }