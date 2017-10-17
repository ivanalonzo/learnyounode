var http = require("http");
var inputURLs = [process.argv[2], process.argv[3], process.argv[4]];

var results = [];

function final() {
	for(var i = 0; i < results.length; i++){
		console.log(results[i]);
	}
}

/*
This really just a holding and return function which allows me to execute something; performGet
in this case, but I could have done other stuff and return the results from performGet back
to the cb as a parameter called data (which is called results in the calling function)
*/
function async(arg, cb){
	performGet(arg, function(err, data){
		cb(data);
	});

}

/*
This function will be our loop. Rather than having a for-loop like normal,
it uses regression to call itself again after it shifts to the next item on the list
Another key is the call to the async function. The async function take in two arguments;
a normal arg, and a callback. This part is super important and is what was causing me
problems. When a callback is expected by a function, you MUST pass it as a function body.

This means something like
function (arg){
	some.action
	return (optional)
};

It is still not obvious to me as to why this is. It has only partly clicked
*/
function series(item){
	if(item){
		async(item, function(result){
			results.push(result);
			return series(inputURLs.shift());
		});
	}else{
		return final();
	}
}

/*
This method takes in a URL and a callback. The callback is used to get data back from
printResponse.
*/
function performGet(validInput, cb){
	http.get(validInput, function(res){
		printResponse(null, res, cb);
	}).on("error", console.error);
}

/*
Like performGet, this takes in some params and a CB which is used to get data back up the stack
I don't think I really need 3 params here. I should refactor to only use the normal err, data approach
*/
function printResponse(err, res, cb){
	var stream = "";
	res.setEncoding("utf8");
	res.on("data", function(chunk){
		stream += chunk;
	});

	res.on("error", function(){
		return cb(err, null);
	});

	res.on("end", function(){
		return cb(null, stream);
	});
}

/*
Will simply invoke series function and pass it the array of inputURLs
*/
series(inputURLs.shift());



/*
Official Solution
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
	for (var i = 0; i < 3; i++) {
		console.log(results[i])
	}
}

function httpGet (index) {
	http.get(process.argv[2 + index], function (response) {
		response.pipe(bl(function (err, data) {
			if (err) {
				return console.error(err)
			}

			results[index] = data.toString()
			count++

			if (count === 3) {
				printResults()
			}
		}))
	})
}

for (var i = 0; i < 3; i++) {
	httpGet(i)
}

*/
