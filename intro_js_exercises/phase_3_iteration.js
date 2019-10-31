Array.prototype.bubblesort = function() {
	unsorted = true;
	while (unsorted) {
		unsorted = false;
		for (i = 0; i < (this.length - 1); i++) {
			if (this[i] > this[i + 1]) {
				[this[i], this[i + 1]] = [this[i + 1], this[i]];
				unsorted = true;
			}
		}
	}
	return this;
};
console.log([1, 4, 7, 3, 2, 1, 10, 15, 12, 14].bubblesort());

String.prototype.substrings = function() {
	let subArr = [];
	for (i = 0; i < this.length; i++) {
		for (x = i; x < this.length; x++) {
			subArr.push(this.slice(i, x + 1));
		}
	}
	return subArr;
};
console.log('cat'.substrings());
