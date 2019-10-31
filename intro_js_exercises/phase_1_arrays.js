Array.prototype.uniq = function() {
	let newArray = [];
	let dict = {};
	this.forEach(el => {
		if (dict[el] === undefined) {
			dict[el] = true;
			newArray.push(el);
		}
	});
	return newArray;
};
console.log([1, 2, 2, 3, 3, 3].uniq())

// Doesnt work with duplicates, I believe.
// Unless an array of indexes is stored to loop over
Array.prototype.twoSum = function() {
	let dict = {}
	let sumArr = []
	this.forEach((el, index) => {
		if (dict[el] !== undefined) {
			sumArr.push([dict[el], index]);
		}
		dict[0 - el] = index;
	});
	return sumArr;
};
console.log([1, 2, -2, 3, -3, -1].twoSum())

Array.prototype.transpose = function() {
	let transposedArr = [];
	for(x = 0; x < this.length; x++) {
		let row = [];
		for (y = 0; y < this[x].length; y++) {
			row.push(this[y][x]);
		}
		transposedArr.push(row);
	}
	return transposedArr;
};

console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9]].transpose());
