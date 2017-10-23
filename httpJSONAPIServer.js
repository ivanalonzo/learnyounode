var http = require("http");
var url = require("url");
var port = process.argv[2];
var tempFileLoc = "/tmp/tempStorage.txt";

/*
I'm really happy about this exercise. It's due to the various exercises I have done.
*/

/*
These two functions use the cb approach. Before I did that, it would call the function but I would
not get data back. The official answer does not need this because they do all of the logic before
using the res object. However, you can see that I res.end within the call to the function. For that reason
I need to send the cb to the function.
*/
function parseTime(arg, cb){
	var t = new Date (arg);
	var newTime = {
		"hour" : t.getHours(),
		"minute" : t.getMinutes(),
		"second" : t.getSeconds()
	};
	cb(newTime);
};

function unixTime(arg, cb){
	var t = new Date(arg);
	var epoch = {
		"unixtime" : t.getTime()
	};
	cb (epoch);
}

/*
This is a simple server setup. Most of the work I did was around splitting the query string
The rest of th work was around the logic in looking up the pathname. If the pathname was something
I would do X, otherwise, I would do Y.

The big discovery moment was in sending a function to the parseTime and unixTime functions. I think
I finally figured out how to work with functions.
*/
var server = http.createServer(function(req, res){
	var myURL = url.parse(req.url);
	var sQuery = myURL.query.split("=");

	if (sQuery[0] == "iso"){
		if (myURL.pathname == "/api/parsetime"){
			res.writeHead(200, { "content-type": "application/json" });
			//Here I am sending a function back into parseTime as the CB
			parseTime(sQuery[1], function (result){
				console.log(result);
				res.end(JSON.stringify(result));
			});
		}
		if (myURL.pathname == "/api/unixtime"){
			res.writeHead(200, { "content-type": "application/json" });
			//Here I am sending a function back into parseTime as the CB
			unixTime(sQuery[1], function (result){
				console.log(result);
				res.end(JSON.stringify(result));
			});
		}
	}else{
		res.writeHead(404);
		console.log("iso was not in the query: " + sQuery[0]);
		res.end();
	}
});

//Just starts the listening on the port set by the input.
server.listen(port);
console.log("Started webserver. Listening on: " + port);

/*
Official answer
var http = require('http')
var url = require('url')

function parsetime (time) {
	return {
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}

function unixtime (time) {
	return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
	var parsedUrl = url.parse(req.url, true)
	var time = new Date(parsedUrl.query.iso)
	var result

	if (/^\/api\/parsetime/.test(req.url)) {
		result = parsetime(time)
	} else if (/^\/api\/unixtime/.test(req.url)) {
		result = unixtime(time)
	}

	if (result) {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(result))
	} else {
		res.writeHead(404)
		res.end()
	}
})
server.listen(Number(process.argv[2]))
*/
