// Async task
function async(arg, callback) {
	console.log("do something with \""+arg+"\", return 1 sec later");
	callback(arg * 2);
}
// Final task
function final() { console.log("Done", results); }

// A simple async series:
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
function series(item) {
	if(item) {
		async( item, function(result) {
			results.push(result);
			return series(items.shift());
		});
	} else {
		return final();
	}
}
series(items.shift());
