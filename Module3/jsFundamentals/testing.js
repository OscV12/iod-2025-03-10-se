// JS Fundamentals Section

// 1. What are the rules of these expressions?

console.log("" + 1 + 0); // "10"    (Empty string + number gives a string)
console.log("" - 1 + 0); // -1      (Empty string converts to 0, so: 0 - 1 + 0)
console.log(true + false); // 1     (true is 1, false is 0)
console.log(!true); // false    (! is the logical NOT operator, which inverts the boolean value of its operand)
console.log(!undefined); //true (undefined is a falsy value, ! inverts it to true)
console.log(6 / "3"); // 2          ("3" is converted to a number)
console.log("2" * "3"); // 6        (Both strings are converted to numbers)
console.log(4 + 5 + "px"); // "9px" (4 + 5 = 9, then "9" + "px")
console.log("$" + 4 + 5); // "$45"  (String + number = string, so "$4" + 5 = "$45")
console.log("4" - 2); // 2          ("4" is converted to a number)
console.log("4px" - 2); // NaN      ("4px" can't be converted into a number)
console.log(" -9 " + 5); // " -9 5" (String + number = string)
console.log(" -9 " - 5); // -14     ("-9" is trimmed and converted to -9)
console.log(null + 1); // 1         (null is converted to 0)
console.log(undefined + 1); // NaN  (undefined is not a number)
console.log(undefined == null); // true    (Loose equality allows it)
console.log(undefined === null); // false  (Strict equality, different types)
console.log(" \t \n" - 2); // -2           (String of whitespace, a space/a tab/a new line, converts to 0)

// 2. Which of the below are not giving the right answer?
//    Why are they not correct? How can we fix them?

let three = "3";
let four = "4";
let thirty = "30";
//what is the value of the following expressions?
let addition = Number(three) + Number(four); //-> 7
// let addition = three + four; Not correct if expecting (3 + 4 = 7)
// JS uses string concatenation when both operands are strings.
// "3" + "4" = "34"
let multiplication = three * four; //-> 12 - Correct, JS coerces both strings to numbers for multiplication.
let division = three / four; //-> 0.75 - Correct, JS coerces both strings to numbers for division.
let subtraction = three - four; //-> -1 - Correct, JS coerces both strings to numbers for subtraction.
let lessThan1 = three < four; //-> true - Correct, even thought these are strings,
//          lexicographically, "3" is less than "4".
let lessThan2 = Number(thirty) < Number(four); //-> false ; Number() or parseInt() converts strings to numbers.
// let lessThan2 = thirty < four; Incorrect if expecting numeric expression.
// Since this is a string comparison, lexicographically, "30" comes
//before "4" because "3" < "4" when comparing characters.

// 3. Which of the following console.log messages will print? Why?

if (0) console.log("#1 zero is true"); // Fail: 0 is a falsy value, so this condition fails.
if ("0") console.log("#2 zero is true"); // Pass: "0" is a non-empty string, and all non-empty strings are truthy.
if (null) console.log("null is true"); // Fail: null is a falsy value, so this condition fails.
if (-1) console.log("negative is true"); // Pass: -1 is a number, and all non-zero numbers are truthy.
if (1) console.log("positive is true"); // Pass: 1 is a truthy value.

// 4. Rewrite this if using the ternary/conditional operator '?'.
//    Test it with different values for a and b. What does the ‘+=’ do?

let a = 7,
  b = 5;
let result = `${a} + ${b} is `;
result += a + b < 10 ? "less than 10" : "greater than 10";
console.log(result);
// += is the addition assignment operator. It adds and assigns
// the value on the right tot he variable on the left.

// 5. Rewrite the following function using: a) function expression syntax,
//    and b) arrow function syntax. Test each version to make sure they work the same.

// Function Expression Syntax:
const getGreeting = function (name) {
  return "Hello " + name + "!";
};

console.log(getGreeting("Oscar")); // Output: Hello Alice!

// Arrow Function Syntax:
//  const getGreeting = (name) => {
//  return "Hello " + name + "!";
//  };

//  console.log(getGreeting("Alex"));

// 6. a) Complete the inigo object by adding a lastName property and including it in the
//    greeting. b) Complete getCatchPhrase so that if the person argument has 6 fingers, it
//    instead prints his famous catch phrase to the console. c) Update getCatchPhrase to
//    use arrow function syntax and a conditional operator.

const westley = {
  name: "Westley",
  numFingers: 5,
};

const rugen = {
  name: "Count Rugen",
  numFingers: 6,
};

const inigo = {
  firstName: "Inigo",
  lastName: "Montoya",

  greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
  },

  getCatchPhrase: (person) =>
    person.numFingers === 6
      ? "You killed my father. Prepare to die."
      : "Nice to meet you.",
};

inigo.greeting(westley);
inigo.greeting(rugen);

// 7. The following object represents a basketball game and keeps track of the score as the
//    game progresses.
//    a) Modify each of the methods so that they can be ‘chained’ together and the last line of
//    the example code works
//    b) Add a new method to print the full time final score
//    c) Add a new object property to keep track of the number of fouls and a method to
//    increment it, similar but separate to the score. Include the foul count in the half time and
//    full time console messages
//    d) Test your object by chaining all the method calls together in different combinations.

const basketballGame = {
  score: 0,
  fouls: 0,

  freeThrow() {
    this.score += 1;
    return this;
  },

  basket() {
    this.score += 2;
    return this;
  },

  threePointer() {
    this.score += 3;
    return this;
  },

  foul() {
    this.fouls += 1;
    return this;
  },

  halfTime() {
    console.log(`Halftime score is ${this.score}. Fouls: ${this.fouls}`);
    return this;
  },

  fullTime() {
    console.log(`Full-time score is ${this.score}. Total fouls: ${this.fouls}`);
    return this;
  },
};

//modify each of the above object methods to enable function chaining as below:
basketballGame
  .basket()
  .freeThrow()
  .foul()
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime()
  .foul()
  .threePointer()
  .freeThrow()
  .fullTime();

// 8. The object below represents a single city.
//    a) Write a function that takes an object as an argument and uses a for...in loop to access
//    and print to the console each of those object properties and their values. Test it using
//    the sydney object below.
//    b) Create a new object for a different city with different properties and call your function
//    again with the new object.

function printCityInfo(city) {
  for (let key in city) {
    console.log(`${key}: ${city[key]}`);
  }
}

const sydney = {
  name: "Sydney",
  population: 5_121_000,
  state: "NSW",
  founded: "26 January 1788",
  timezone: "Australia/Sydney",
};

printCityInfo(sydney);

const denver = {
  name: "Denver",
  population: 716_577,
  state: "Colorado",
  founded: "22 November 1858",
  timezone: "Mountain Daylight Time",
};

printCityInfo(denver);

// 9. Use the following variables to understand how JavaScript stores objects by reference.
//    a) Create a new moreSports variable equal to teamSports and add some new sport
//    values to it (using push and unshift)
//    b) Create a new dog2 variable equal to dog1 and give it a new value
//    c) Create a new cat2 variable equal to cat1 and change its name property
//    d) Print the original teamSports, dog1 and cat1 variables to the console. Have they
//    changed? Why?
//    e) Change the way the moreSports and cat2 variables are created to ensure the
//    originals remain independent

// Initial variables
let teamSports = ["Hockey", "Cricket", "Volleyball"];
let dog1 = "Bingo";
let cat1 = { name: "Fluffy", breed: "Siberian" };

// a)
let moreSports = teamSports;
moreSports.push("Basketball");
moreSports.unshift("Soccer");

// b)
let dog2 = dog1;
dog2 = "Charlie";

// c)
let cat2 = cat1;
cat2.name = "Mittens";

// d)
console.log("teamSports:", teamSports);
console.log("dog1:", dog1);
console.log("cat1:", cat1);

// e)
let newSports = [...teamSports];
newSports.push("Rugby");

let newCat = { ...cat1 };
newCat.name = "Snowball";

console.log("teamSports (after spreading):", teamSports);
console.log("newSports:", newSports);
console.log("cat1 (after spreading):", cat1);
console.log("newCat:", newCat);

//  10. The following constructor function creates a new Person object with the given name and
//      age values.
//      a) Create a new person using the constructor function and store it in a variable
//      b) Create a second person using different name and age values and store it in a separate variable
//      c) Print out the properties of each person object to the console
//      d) Rewrite the constructor function as a class called PersonClass and use it to create a
//      third person using different name and age values. Print it to the console as well.
//      e) Add a canDrive method to both the constructor function and the class that returns true
//      if the person is old enough to drive.

// a) & b)
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
  this.canDrive = function () {
    return this.age >= 16;
  };
}

const person1 = new Person("Alice", 22);
const person2 = new Person("Bob", 14);

// c)
console.log(person1);
console.log(person2);

console.log(`${person1.name} can drive?`, person1.canDrive());
console.log(`${person2.name} can drive?`, person2.canDrive());

// d)
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
  }

  canDrive() {
    return this.age >= 16;
  }
}

const person3 = new PersonClass("Charlie", 18);
console.log(person3);
console.log(`${person3.name} can drive?`, person3.canDrive());
