var fs = require("fs");
var inputFile = process.argv[2];
var contents = fs.readFileSync(inputFile, "utf8");
var contentsArray = contents.split("\n");
var lines = 0;

for (var i = 0; i < contentsArray.length; i++){
	//console.log(contentsArray[i]);
	lines++;
}

//now we need to decrease the count by 1 because the
//expectation is the file does NOT have \n at the end of it,
//therefore, you should NOT count that final \n (for this exercise you should not)
console.log(--lines);
