var http = require("http");
var inputURL = process.argv[2];
/*
I made this program overly complex, but for a reason. I wanted to see how I could add
some additional logic to make it more input-safe.
*/

//This calls the validInput function. Unless you have this statement (calling the function)
//nothing will happen.
verifyInput(inputURL);

/*
This will do some basic validation, afterwards, it will make a call to another method
called performGet. Like verifyInput, unless you make a call to it, it will not execute
*/
function verifyInput (inputURL){
	var validInput = "";
	if(!inputURL.startsWith("http://")){
		validInput = "http://" + inputURL;
	}else{
		validInput = inputURL;
	}
	performGet(validInput);
}

/*
Super Simple call to http.get. It's just a "java-like" way for passing the response over to another
function. Note the error handling. There is a ".on("error", console.error)" call as part of the GET, not as a part
of the response (res). The errror handling for the response is done elsewhere (in printResponse)
*/
function performGet(validInput){
	http.get(validInput, function(res){
		printResponse(res);
	}).on("error", console.error);
}

/*
This function actually does the handling of the response (res). The first thing is it sets the encoding
the second thing is that it checks for an event. Events can be accessed through the "on" method
You can see res.on("event", callback). The data event gives you a "chuck" stream that you can console.out

There are two other events, error and end.
*/
function printResponse(res){
	res.setEncoding("utf8");
	res.on("data", function(chunk){
		console.log(chunk);
	});

	res.on("error", function(){
		console.error;
	});

	res.on("end", function(){
	});
}
