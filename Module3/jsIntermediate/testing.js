//1. Create a function that takes a string as a parameter and returns the string with the first
//   character of each word changed into a capital letter, as in the example below. Test it with
//   different strings.

function ucFirstLetters(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(ucFirstLetters("los angeles")); //Los Angeles
console.log(ucFirstLetters("hello world")); //Hello World
console.log(ucFirstLetters("princess nefertari vivi")); //Princess Nefertari Vivi
console.log(ucFirstLetters("javascript intermediate")); //Javascript Intermediate

// 2. Create a function truncate(str, max) that truncates a given string of text if its total
//    length is greater than the max length. It should return either the truncated text, with an
//    ellipsis (...) added to the end if it was too long, or the original text otherwise.
//    b) Write another variant of the truncate function that uses a conditional operator.
function truncate(string, max) {
  if (string.length > max) {
    return string.slice(0, max) + "...";
  } else {
    return string;
  }
}

function truncate(string, max) {
  return string.length > max ? string.slice(0, max) + "..." : string;
}

console.log(truncate("This text will be truncated if it is too long", 25));
// This text will be truncat...

// 3. Use the following animals array for the below tasks. Test each one by printing the result to
//    the console.
//    a) Add 2 new values to the end
//    b) Add 2 new values to the beginning
//    c) Sort the values alphabetically
//    d) Write a function replaceMiddleAnimal(newValue) that replaces the value in the
//    middle of the animals array with newValue
//    e) Write a function findMatchingAnimals(beginsWith) that returns a new array
//    containing all the animals that begin with the beginsWith string. Try to make it work
//    regardless of upper/lower case.

// Initial array
const animals = ["Tiger", "Giraffe"];
console.log("Initial animals:", animals);

// a) Add 2 new values to the end
animals.push("Panda", "Kangaroo");
console.log("After adding to end:", animals);

// b) Add 2 new values to the beginning
animals.unshift("Lion", "Monkey");
console.log("After adding to beginning:", animals);

// c) Sort the values alphabetically
animals.sort();
console.log("Sorted animals:", animals);

// d) Replace the middle animal
function replaceMiddleAnimal(newValue) {
  const middleIndex = Math.floor(animals.length / 2);
  animals[middleIndex] = newValue;
}

replaceMiddleAnimal("Koala");
console.log("After replacing middle animal:", animals);

// e) Find matching animals by prefix (case-insensitive)
function findMatchingAnimals(beginsWith) {
  const lowerPrefix = beginsWith.toLowerCase();
  return animals.filter((animal) =>
    animal.toLowerCase().startsWith(lowerPrefix)
  );
}

// Testing the match function
console.log('Animals starting with "l":', findMatchingAnimals("P"));
console.log('Animals starting with "G":', findMatchingAnimals("G"));

// 4. Write a function camelCase(cssProp) that changes dash-separated CSS properties like
//    'margin-left' into camel-cased 'marginLeft'.
//    The function should remove all dashes, and uppercase the first letter of each word after a
//    dash.
//    b) Create variants of the camelCase function that use different types of for loops, and
//    c) with and without the conditional operator.

// a) using split and map
function camelCaseA(cssProp) {
  return cssProp
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

// b) using a for loop
function camelCaseB(cssProp) {
  const parts = cssProp.split("-");
  let result = parts[0];
  for (let i = 1; i < parts.length; i++) {
    result += parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  return result;
}

// c) with and without conditional operator
function camelCaseC(cssProp) {
  let result = "";
  let capitalizeNext = false;

  for (const char of cssProp) {
    result +=
      char === "-"
        ? ((capitalizeNext = true), "")
        : capitalizeNext
        ? ((capitalizeNext = false), char.toUpperCase())
        : char;
  }

  return result;
}

// Testing all versions

console.log(camelCaseA("margin-left"));
console.log(camelCaseA("background-image"));
console.log(camelCaseA("display"));

console.log(camelCaseB("margin-left"));
console.log(camelCaseB("background-image"));
console.log(camelCaseB("display"));

console.log(camelCaseC("margin-left"));
console.log(camelCaseC("background-image"));
console.log(camelCaseC("display"));

// 5. Decimal number operations in JavaScript can lead to unexpected results, as in the
//    following:

let twentyCents = 0.2;
let tenCents = 0.1;
console.log(`${twentyCents} + ${tenCents} = ${twentyCents + tenCents}`); // 0.2 + 0.1 = 0.30000000000000004

//    We can sometimes avoid this using the toFixed function to force the number of decimal
//    places as below, but it’s not always useful:

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2);
console.log(fixedTwenty + fixedTen); //why is this not working?

//    a) Explain why the above code returns the wrong answer
//    b) Create a function currencyAddition(float1, float2) which safely adds the two
//    decimal numbers float1 and float2 and returns the correct float result.
//    c) Create a function currencyOperation(float1, float2, operation) which
//    safely performs the given operation (either +, -, / or *) on the two numbers and returns
//    the correct float result.
//    d) (Extension) Extend the above function to include a fourth argument numDecimals
//    which allows the operation to support different amounts of decimal places from 1 to 10.

// a) .toFixed() returns a string, not a number. So when you do "0.20" + "0.10", it
//    concatenates them, not adds them. Therefor the result is "0.200.10".

// b)
function currencyAddition(float1, float2) {
  const factor = 100;
  return (Math.round(float1 * factor) + Math.round(float2 * factor)) / factor;
}

// c)
function currencyOperation(float1, float2, operation) {
  const factor = 100;
  const int1 = Math.round(float1 * factor);
  const int2 = Math.round(float2 * factor);
  let result;

  switch (operation) {
    case "+":
      return (int1 + int2) / factor;
    case "-":
      return (int1 - int2) / factor;
    case "*":
      return Number((float1 * float2).toFixed(2));
    case "/":
      return Number((float1 / float2).toFixed(2));
    default:
      throw new Error("Invalid operation");
  }
}

// d)
function currencyOperationExt(float1, float2, operation, numDecimals = 2) {
  const factor = Math.pow(10, numDecimals);
  const int1 = Math.round(float1 * factor);
  const int2 = Math.round(float2 * factor);
  let result;

  switch (operation) {
    case "+":
      return (int1 + int2) / factor;
    case "-":
      return (int1 - int2) / factor;
    case "*":
      return Number((float1 * float2).toFixed(numDecimals));
    case "/":
      return Number((float1 / float2).toFixed(numDecimals));
    default:
      throw new Error("Invalid operation");
  }
}

// Tests
console.log(currencyAddition(0.1, 0.2)); // 0.3
console.log(currencyOperation(0.1, 0.2, "+")); // 0.3
console.log(currencyOperationExt(0.1, 0.2, "+", 4)); // 0.3000

// 6. Create a function unique(duplicatesArray) which takes an array parameter that may
//    include duplicates. Your function should return an array containing only the unique values
//    from duplicatesArray.
//    Test with the following arrays and create another one of your own.

function unique(duplicatesArray) {
  return [...new Set(duplicatesArray)];
}

const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "red",
  "blue",
  "yellow",
];
const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43];
const movies = [
  "Austin Powers",
  "Paddington 2",
  "Inception",
  "Pulp Fiction",
  "Jojo Rabbit",
];
console.log(unique(colors)); // [ 'red', 'green', 'blue', 'yellow', 'orange' ]
console.log(unique(testScores)); // [ 55, 84, 97, 63, 32, 91, 43 ]
console.log(unique(movies)); // ["Austin Powers", "Paddington 2", "Inception", "Pulp Fiction", "Jojo Rabbit" ]

// 7. Use the following array of book objects to practice the array functions for map, find and
//    filter. Test each of your answers to the below tasks.

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  { id: 4, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
];

//    a) Write a function getBookTitle(bookId) that uses the find function to return the
//    title of the book object with the matching id.
//    b) Write a function getOldBooks() that uses the filter function to return all book
//    objects written before 1950.
//    c) Write a function addGenre() that uses the map function to add a new genre property
//    to all of the above books, with the value ‘classic’.
//    d) (Extension) Write a function getTitles(authorInitial) that uses map and
//    filter together to return an array of book titles for books written by authors whose
//    names start with authorInitial.
//    e) (Extension) Write a function latestBook() that uses find and forEach to get the
//    book with the most recent publication date.

// a)
function getBookTitle(bookId) {
  const book = books.find((b) => b.id === bookId);
  return book ? book.title : "Book not found";
}

console.log(getBookTitle(3));

// b)
function getOldBooks() {
  return books.filter((book) => book.year < 1950);
}

console.log(getOldBooks());

// c)
function addGenre() {
  return books.map((book) => ({ ...book, genre: "classic" }));
}

console.log(addGenre());

// d)
function getTitles(authorInitial) {
  return books
    .filter((book) => book.author.startsWith(authorInitial))
    .map((book) => book.title);
}

console.log(getTitles("G"));

// e)
function latestBook() {
  let latestYear = 0;
  books.forEach((book) => {
    if (book.year > latestYear) {
      latestYear = book.year;
    }
  });
  return books.find((book) => book.year === latestYear);
}

console.log(latestBook());

// 8. The following code creates a new Map object for storing names beginning with A, B, or C
//    with their phone numbers.

const phoneBookABC = new Map(); //an empty map to begin with
phoneBookABC.set("Annabelle", "0412312343");
phoneBookABC.set("Barry", "0433221117");
phoneBookABC.set("Caroline", "0455221182");

//    a) Create a new phoneBookDEF Map to store names beginning with D, E or F
//    b) Initialize the contents of phoneBookDEF by passing in an array of keys/values
//    c) Update the phone number for Caroline
//    d) Write a function printPhoneBook(contacts) that prints the names and phone
//    numbers in the given Map
//    e) Combine the contents of the two individual Maps into a single phoneBook Map
//    f) Print out the full list of names in the combined phone book

// a,b)
const phoneBookDEF = new Map([
  ["Devin", "6429562354"],
  ["Emma", "9862018401"],
  ["Frank", "0251375829"],
]);

// c)
phoneBookABC.set("Caroline", "9671842048");

// d)
function printPhoneBook(contacts) {
  for (let [name, number] of contacts) {
    console.log(`${name}: ${number}`);
  }
}

// e)
const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);

// f)
console.log("Full list of names in the phone book:");
for (let name of phoneBook.keys()) {
  console.log(name);
}
console.log("\nFull phone book:");
printPhoneBook(phoneBook);

// 9. Given the below salaries object, perform the following tasks.

let salaries = {
  Timothy: 35000,
  David: 25000,
  Mary: 55000,
  Christina: 75000,
  James: 43000,
};

//    a) Write a function sumSalaries(salaries) that calculates and returns the total of all
//    salaries
//    b) Write a function topEarner(salaries) that calculates and returns the name of the
//    person earning the highest salary

// a)
function sumSalaries(salaries) {
  let total = 0;
  for (let salary of Object.values(salaries)) {
    total += salary;
  }
  return total;
}
console.log("Total salaries:", sumSalaries(salaries));

// b)
function topEarner(salaries) {
  let topName = null;
  let maxSalary = 0;

  for (let [name, salary] of Object.entries(salaries)) {
    if (salary > maxSalary) {
      maxSalary = salary;
      topName = name;
    }
  }

  return topName;
}

console.log("Top earner:", topEarner(salaries));

// 10. The following code uses the Date object to print the current time and the number of hours
//     that have passed today so far. Extend the code to do the following:

const today = new Date();
console.log("Current time is " + today.toLocaleTimeString());
console.log(today.getHours() + " hours have passed so far today");

//     a) Print the total number of minutes that have passed so far today
//     b) Print the total number of seconds that have passed so far today
//     c) Calculate and print your age as: 'I am x years, y months and z days old'
//     d) Write a function daysInBetween(date1, date2) which calculates and returns the
//     amount of days in between the two given dates.

// a)
let minutesPassed = today.getHours() * 60 + today.getMinutes();
console.log(minutesPassed + " minutes have passed so far today");

// b)
let secondsPassed = minutesPassed * 60 + today.getSeconds();
console.log(secondsPassed + " seconds have passed so far today");

// c)
const birthDate = new Date("1994-10-01");
const ageDiff = new Date(today - birthDate);

const years = ageDiff.getUTCFullYear() - 1970;
const months = ageDiff.getUTCMonth();
const days = ageDiff.getUTCDate() - 1;

console.log(`I am ${years} years, ${months} months and ${days} days old.`);

// d)
function daysInBetween(date1, date2) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.abs(date2 - date1);
  return Math.floor(diff / msPerDay);
}
let date1 = new Date("2020-01-18");
let date2 = new Date("2025-04-19");
console.log(`Days between: ${daysInBetween(date1, date2)}`);
