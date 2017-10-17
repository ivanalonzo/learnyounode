/*
This function takes in three params, id, size and a callback (cb)
The cb is executed as part of the timeout. You don't know which
cb it is calling, at this level. You have to see the function that was
included when loadItem was invoked (in this case it was
like this: loadItem(1, 3, itemLoaded))
*/
function loadItem (id, size, cb){
	setTimeout(function() {
		cb(null, { id: id }, size);
	}, 1000);
}

/*
This has two members, an array to track the stuff you have loaded
and a function for viewing those items
*/
var loadedItems = [];
function itemsLoaded() {
	console.log("Do something with: ", loadedItems);
}

/*
This is the function that will add items to the array and will eventually call
itemsLoaded(), which simply prints the items that were loaded
*/
function itemLoaded(err, item, size){
	loadedItems.push(item);
	if(loadedItems.length == size){
		itemsLoaded();
	}
}

var max = 3;
for (var i = 1; i <= max; i++){
	loadItem(i, max, itemLoaded);
}
