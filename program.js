var http = require("http");
var url = require("url");
var port = process.argv[2];
var tempFileLoc = "/tmp/tempStorage.txt";

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

var server = http.createServer(function(req, res){
	var myURL = url.parse(req.url);
	var sQuery = myURL.query.split("=");

	if (sQuery[0] == "iso"){
		if (myURL.pathname == "/api/parsetime"){
			res.writeHead(200, { "content-type": "application/json" });
			parseTime(sQuery[1], function (result){
				console.log(result);
				res.end(JSON.stringify(result));
			});
		}
		if (myURL.pathname == "/api/unixtime"){
			res.writeHead(200, { "content-type": "application/json" });
			unixTime(sQuery[1], function (result){
				console.log(result);
				res.end(JSON.stringify(result));
			});
		}
	}else{
		res.writeHead(400, { "content-type": "application/json" });
		console.log("iso was not in the query: " + sQuery[0]);
		res.end();
	}





	// console.log(myURL.pathname);
	// console.log(myURL.query);


	//
	// unixTime(Date.now(), function (result){
	// 	console.log(result);
	// 	res.end(JSON.stringify(result));
	// });



});

//Just starts the listening on the port set by the input.
server.listen(port);
console.log("Started webserver. Listening on: " + port);
