var http = require("http");
var fs = require("fs");
var port = process.argv[2];
var fileToServe = process.argv[3];

/*
The big thing I learned here is more about events. So the createReadStream function wil return back an object
which has events. Two events I use here are on.Open and on.Error. Then for each of those I pass a
function so that it can perform the desired action (if open, or error). 
*/
var server = http.createServer(function(req, res){
	res.writeHead(200, { "content-type": "text/plain" });
	var readStream = fs.createReadStream(fileToServe);
	readStream.on("open", function(){
		readStream.pipe(res);
	});

	readStream.on("error", function(err){
		res.end(err);
	});
});

//Just starts the listening on the port set by the input.
server.listen(port);

/*
Official answer
var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'content-type': 'text/plain' })

	fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
*/
