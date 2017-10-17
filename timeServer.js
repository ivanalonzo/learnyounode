var net = require("net");
var port = process.argv[2];

/*
Simple function for returning the formatted date
*/
function getTime (time){
	var t = new Date(Date.now());
	var month = 1 + t.getMonth();
	var formattedDate = t.getFullYear() + "-" + month + "-" + t.getDate() + " "
												+ t.getHours() + ":" + t.getMinutes() + "\n";
	time = formattedDate;
	return time;
}

/*
It will create a new server object. As part of the params of the function, it takes in a function itself
The function it takes is a listener function (the one with function(socket)). That listener function is
triggered after every connection to the server
*/
var server = net.createServer(function (socket) {
	socket.write(getTime());
	socket.end();
});

//Just starts the listening on the port set by the input. 
server.listen(port);

/*
Official answer
var net = require('net')

function zeroFill (i) {
	return (i < 10 ? '0' : '') + i
}

function now () {
	var d = new Date()
	return d.getFullYear() + '-' +
		zeroFill(d.getMonth() + 1) + '-' +
		zeroFill(d.getDate()) + ' ' +
		zeroFill(d.getHours()) + ':' +
		zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
	socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
*/
