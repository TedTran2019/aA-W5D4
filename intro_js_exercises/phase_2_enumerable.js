Array.prototype.myEach = function(callbackFnc) {
	for (i = 0; i < this.length; i++) {
		callbackFnc(this[i]);
	}
};
let arr = [1, 2, 3];
function dummyFnc(el) {}
console.log(arr.myEach(dummyFnc) === undefined);

Array.prototype.myMap = function(callbackFnc) {
	let newArr = [];
	this.myEach(el => {
		newArr.push(callbackFnc(el));
	});
	return newArr;
};
function addOne(el) { return el + 1 }
console.log(arr.myMap(addOne));

Array.prototype.myReduce = function(callbackFnc, initialValue) {
	let arr = this;
	if (initialValue === undefined) {
		initialValue = this[0];
		arr = this.slice(1, this.length);
	}
	arr.myEach(el => {
		initialValue = callbackFnc(initialValue, el);
	});
	return initialValue;
};
function sum(accu, el) {
	return accu + el;
}
console.log(arr.myReduce(sum));
console.log(arr);
