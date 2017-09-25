var fs = require("fs");
var inputFile = process.argv[2];

/*
This function can execute at anytime. JS load everything into memory and it will execute
this part when possible. Because this function has some real logic (specially around loading the fil)
it will likely not happen until after the other parts of this program.
For this reason you need to havee the goOn function call (callback) before the end
This tells Node to NOT execute goOn whenever it sees it (remember it loads everything into memory), but to wait
until is is called within this fs.readFile function.

By placing it inside the function (rs.readFile), we are saying to node that we need to execute its contents (those of
fs.readFile), then execute the goOn function.
*/
fs.readFile(inputFile, "utf8", function(err, data){
	if (err){
		return console.log (err);
	}
	//by the time it gets here, we should have access to data and we can now pass data over to whoever needs it, in this
	//case goOn will use it.
	goOn(data);
});

var contentsArray;

function goOn(data){
	//console.log(data);
	contentsArray = data.split("\n");
	var lines = 0;

	for (var i = 0; i < contentsArray.length; i++){
		//console.log(contentsArray[i]);
		lines++;
	}

	//now we need to decrease the count by 1 because the
	//expectation is the file does NOT have \n at the end of it,
	//therefore, you should NOT count that final \n (for this exercise you should not)
	console.log(--lines);
}
