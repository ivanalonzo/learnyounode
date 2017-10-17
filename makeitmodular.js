var filePath = process.argv[2];
var extension = process.argv[3];
var mymod = require("./mymodule.js");

/*
This uses module export approach. The logic is very similar to filteredLS
the main difference is the logic resides in "mymodule.js". This is how Node exports
libraries.

Because mymodule just exports an anonymous function, you simply call it directly
(mymode(...)), rather than mymod.function_name(...)

Another thing to look at is the third parameter in the function signature. You have
what you expect, filePath, extension and a callback with err and data as parameters for the
callback itself.

That's the way you get data back, through these parameters. Unlike java, where you can only get
one data type back, you can get the err and the data (I suppose it's like getting an exception
and the return data type back) in those params.

The weird part is in the implementation on the mymodule.js side. For that please view that file
*/
mymod(filePath, extension, function(err, data){
	if(err){
		console.log("Error: " + err);
	}
	if(data){
		for (var i = 0; i < data.length; i++){
			console.log(data[i]);
		}
	}else{
		console.log("Data empty");
	}
});

/*
This is the proposed solution

var filterFn = require('./solution_filter.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
	if (err) {
		return console.error('There was an error:', err)
	}

	list.forEach(function (file) {
		console.log(file)
	})
})
*/
