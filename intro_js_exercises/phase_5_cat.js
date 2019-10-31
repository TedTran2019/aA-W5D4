function Cat(name, owner) {
	this.name = name;
	this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
	return `${this.owner} loves ${this.name}`;
}

let kitty = new Cat('kitty', 'Ted');
let meow = new Cat('meow', 'Ted');
console.log(kitty.cuteStatement());
console.log(meow.cuteStatement());

Cat.prototype.cuteStatement = function() {
	return `Everyone loves ${this.name}`;
}

console.log(kitty.cuteStatement());
console.log(meow.cuteStatement());

Cat.prototype.meow = function() {
	console.log('Meow!');
}
kitty.meow();

kitty.meow = function() {
	console.log('Squeek!');
}

kitty.meow();
meow.meow();
