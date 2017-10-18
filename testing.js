
var query = "ivan=hi";
console.log (query.split("="));
var newQuery = query.split("=");
for (var i = 0; i < newQuery.length; i++){
	console.log (newQuery[i]);
}
