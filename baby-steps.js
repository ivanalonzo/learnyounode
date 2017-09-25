var stuff = process.argv;

function addInput(inputValues){
	var sum = 0;
	for (var i = 2; i < inputValues.length; i++){
		sum += Number(inputValues[i]);
	}
	return sum;
}

console.log(addInput(stuff));
