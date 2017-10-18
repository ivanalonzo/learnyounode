var http = require("http");
var fs = require("fs");
var port = process.argv[2];
var map = require("through2-map");
var tempFileLoc = "/tmp/tempStorage.txt";

/*
I spent a lot of time on this (you can tell by looking at the code I commented out below)
Mainly I got stuck in the idea that I first needed to read the data and create a body
of the request. After that I would save it to a file, which I would use for storage of the
req.stream. During storage I also did the uppercase conversion.

Anyway, the solution was much simpler than that. Just pipe the input req stream and use
the map function. Within the map function you do the uppercase conversion and finally
pipe the results back to the res.stream
*/
var server = http.createServer(function(req, res){
	var body = "";
	if(req.method == "POST"){
		req.pipe(map(function (chunk) {
			return chunk.toString().toUpperCase();
		})).pipe(res);
	};
});

//Just starts the listening on the port set by the input.
server.listen(port);
console.log("Started webserver. Listening on: " + port);

// var server = http.createServer(function(req, res){
// 	var body = "";
// 	if(req.method == "POST"){
// 		var tempStorage = fs.createWriteStream(tempFileLoc);
//
// 		req.on("data", function (data){
// 			body += data;
// 		});
//
// 		req.on("end", function (){
// 			tempStorage.write(body.toUpperCase());
// 		});
//
// 		res.writeHead(200, {"Content-Type": "text/html"});
// 		var readStream = fs.createReadStream(tempFileLoc);
// 		readStream.on("open", function(){
// 			readStream.pipe(res);
// 		});
//
// 		readStream.on("error", function(err){
// 			res.end(err);
// 		});
// 	};
// });
//
// //Just starts the listening on the port set by the input.
// server.listen(port);
// console.log("Started webserver. Listening on: " + port);

/*
This is the official solution

var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
	if (req.method !== 'POST') {
		return res.end('send me a POST\n')
	}

	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase()
	})).pipe(res)
})

server.listen(Number(process.argv[2]))
*/
