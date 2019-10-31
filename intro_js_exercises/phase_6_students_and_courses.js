// Surprised we aren't using ES6 class syntax...

function Student(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.courses = [];
}

Student.prototype.name = function() {
	return (this.firstName + ' ' + this.lastName);
};

Student.prototype.enroll = function(course) {
	if (this.hasConflict(course)) {
		throw "You already have another course this day and time!";
	}
	if (course.students.includes(this)) {
		return;
	}
	course.addStudent(this);
};

Student.prototype.hasConflict = function(course) {
	return (this.courses.some(el => {
		return el.conflictsWith(course);
	}));
};

Student.prototype.courseLoad = function() {
	let creditsPerDepartment = {};
	this.courses.forEach(el => {
		if (creditsPerDepartment[el.department] === undefined) {
			creditsPerDepartment[el.department] = el.credits;
		} else {
			creditsPerDepartment[el.department] += el.credits;
		}
	});
	return creditsPerDepartment;
};

function Course(name, department, credits, day, timeBlock) {
	this.name = name;
	this.department = department;
	this.credits = credits;
	this.students = [];
	this.day = day;
	this.timeBlock = timeBlock;
}

Course.prototype.addStudent = function(student) {
	this.students.push(student);
	student.courses.push(this);
};

Course.prototype.conflictsWith = function(course) {
	if (this.day === course.day && this.timeBlock === course.timeBlock) {
		return true;
	} else {
		return false;
	}
}

// Testing here!

let studentA = new Student('A', 'A');
let studentB = new Student('B', 'B');
let studentC = new Student('C', 'C');

console.log(studentA.name());

// Day: 'mon' - 'sun'
// Time Block: 1 - 8
let courseA = new Course('Math', 'STEM', 5, 'mon', 1);
let courseB = new Course('History', 'Lib', 3, 'tues', 2);
let courseC = new Course('Physics', 'STEM', 5, 'mon', 1); // Overlaps with A
let courseD = new Course('English', 'Lib', 3, 'wed', 3);
let courseE = new Course('Art', 'Lib', 3, 'thurs', 4);
let courseF = new Course('Comp Sci', 'STEM', 4, 'fri', 5);

studentA.enroll(courseA);
console.log(studentA);
// studentA.enroll(courseA); // Throws error
console.log(studentA.hasConflict(courseB)); // False
console.log(studentA.hasConflict(courseC)); // True, overlaps
studentA.enroll(courseB);
studentA.enroll(courseD);
studentA.enroll(courseE);
studentA.enroll(courseF);
console.log(studentA);
console.log(studentA.courseLoad());
console.log(courseA.students);
courseA.addStudent(studentB);
console.log(courseA.students);
console.log(courseA.conflictsWith(courseB));
console.log(courseA.conflictsWith(courseC));
