// Huh, unshift returns the new array's length lol.
function range(start, end) {
	if (start >= end) {
		return [];
	}
	let arr = range(start + 1, end);
	arr.unshift(start);
	return arr;
}
console.log(range(1, 5));

function sumRec(arr) {
	if (arr.length < 1) {
		return 0;
	}
	return arr[0] + sumRec(arr.slice(1, arr.length));
}
console.log(sumRec([4, 5, 6]));

function exponent(base, exp) {
	if (exp < 1) {
		return 1;
	}
	return base * exponent(base, exp - 1)
}
console.log(exponent(3, 3));

function exponentBetter(base, exp) {
	if (exp < 1) {
		return 1;
	}
	if (exp % 2 === 0) {
		let res = exponentBetter(base, exp / 2);
		return res * res;
	} else {
		let res = exponentBetter(base, (exp - 1) / 2);
		return base * res * res;
	}
}
console.log(exponentBetter(3, 3));

function fibonacci(n) {
	if (n < 0) {
		return 'Incorrect input!';
	} else if (n === 1) {
		return [0];
	} else if (n === 2) {
		return [0, 1];
	}
	let arr = fibonacci(n - 1);
	arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
	return arr;
}
console.log(fibonacci(10));

function deepDup(arr) {
	let copy = [];
	arr.forEach(el => {
		if (el instanceof Array) {
			copy.push(deepDup(el));
		} else {
			copy.push(el);
		}
	});
	return copy;
}
arr = [1, 2, 3, [4, 5], [6, 7, 8], [9]];
copy = deepDup(arr);
console.log(arr);
console.log(copy);
arr[3][1] = [100];
console.log(arr);
console.log(copy);

function bsearch(arr, target) {
	if (arr.length === 0) {
		return -1;
	}
	let half = Math.floor(arr.length / 2);
	if (arr[half] === target) {
		return half;
	} else if (arr[half] > target) {
		bsearch(arr.slice(0, half), target);
	} else {
		result = bsearch(arr.slice(half + 1, arr.length), target);
		if (result === -1) {
			return -1;
		}
		return (half + 1 + result);
	}
}
console.log(bsearch([1, 2, 3], 3));
console.log(bsearch([1, 2, 3], 5));

function mergesort(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	let half = Math.floor(arr.length / 2);
	let left = mergesort(arr.slice(0, half));
	let right = mergesort(arr.slice(half, arr.length));
	return merge(left, right);
}

function merge(left, right) {
	let arr = [];
	while (left.length > 0 && right.length > 0) {
		if (left[0] > right[0]) {
			arr.push(right.shift());
		} else {
			arr.push(left.shift());
		}
	}
	return arr.concat(left, right);
}
arr = [3, 1, 8, 0, 11, 14, 80, 54, 4, 5, 8, 1, 3];
console.log(mergesort(arr));
console.log(arr);

function subsets(arr) {
	if (arr.length === 0) {
		return [[]];
	}
	let subset = subsets(arr.slice(0, arr.length - 1));
	let contain = arr[arr.length - 1];
	let copy = deepDup(subset);
	for (i = 0; i < subset.length; i++) {
		copy[i].push(contain);
	}
	return subset.concat(copy);
}
// An example: subsets([1, 2, 3])
// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
console.log(subsets([1, 2, 3]));
