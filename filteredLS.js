var fs = require("fs");
var filePath = process.argv[2];
var extension = process.argv[3];

fs.readdir(filePath, "utf8", function(err, data){
	if (err){
		return console.log (err);
	}
	//by the time it gets here, we should have access to data and we can now pass data over to whoever needs it, in this
	//case goOn will use it.
	goOn(data);
});

function goOn(data){
	//console.log("Extension: " + extension);
	for (var i = 0; i < data.length; i++){
		//console.log(data[i]);
		if (data[i].endsWith(extension) && data[i] != extension){
			console.log(data[i]);
		}
	}
}
