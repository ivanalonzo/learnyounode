var fs = require("fs");
var path = require("path");

/*
In this file I'm creating an anonymous function and exporting it. There are three parameters,
filePath, extension and a callback. The tricky part is the callback. This is what is used for getting
data BACK to the user of this module.

So rather than throwing an exception for dealing with errors, you return a callback with the err parameter
assigned the err value and the data parameter nulled out.
Similarly, to return the results back to the caller, you return a callback with the data value and the err
parameter nulled out.

*/
module.exports = function(filePath, extension, callback){
	fs.readdir(filePath, "utf8", function(err, data){
		if (err){
			return callback(err, null);
		}

		var matches = [];
		for (var i = 0; i < data.length; i++){
			if (path.extname(data[i]) == "." + extension){
				matches.push(data[i]);
			}
		}
		return callback(null, matches);
	});
};

/*
This is the proposed solution. It's very similar minus the use of an object called
list which seems to have a built-in filter function (not really sure how that is working)
and uses a similar approach for determining if the ext is part of the file or not

var fs = require('fs')
var path = require('path')

module.exports = function (dir, filterStr, callback) {
	fs.readdir(dir, function (err, list) {
		if (err) {
			return callback(err)
		}

		list = list.filter(function (file) {
			return path.extname(file) === '.' + filterStr
		})

		callback(null, list)
	})
}
*/
