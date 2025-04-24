// 1. makeCounter below is a decorator function which creates and returns a function that
//    increments a counter.
//    a) Create a second counter counter2 using the makeCounter function and test to see if
//    it remains independent to counter1
//    b) Modify makeCounter so that it takes an argument startFrom specifying where the
//    counter starts from (instead of always starting from 0)
//    c) Modify makeCounter to take another argument incrementBy, which specifies how
//    much each call to counter() should increase the counter value by.

function makeCounter() {
  let currentCount = 0;
  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

// a) Create second counter

let counter2 = makeCounter();
counter2(); // 1
counter2(); // 2
// Each makeCounter() call creates a new independent closure, so counter2 is separate from counter1

// b) Add startFrom argument

function makeCounter(startFrom = 0) {
  let currentCount = startFrom;
  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };
}

let counter3 = makeCounter(10);
counter3(); // 11
counter3(); // 12

// c) Add incrementBy argument

function makeCounter(startFrom = 0, incrementBy = 1) {
  let currentCount = startFrom;
  return function () {
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}

let counter4 = makeCounter(10, 2); // starts at 10, increments by 2
counter4(); // 12
counter4(); // 14

let counter5 = makeCounter(100, 10); // starts at 100, increments by 10
counter5(); // 110
counter5(); // 120

// 2. The following delayMsg function is intended to be used to delay printing a message until
//    some time has passed.
//    a) What order will the four tests below print in? Why?
//    b) Rewrite delayMsg as an arrow function
//    c) Add a fifth test which uses a large delay time (greater than 10 seconds)
//    d) Use clearTimeout to prevent the fifth test from printing at all.

// a) Print order, and why
//#4: Not delayed at all – because it's called directly, no delay
//#3: Delayed by 0ms – scheduled with 0ms, but still runs after the current call stack finishes
//#2: Delayed by 20ms – runs after 20ms
//#1: Delayed by 100ms – runs after 100ms

// b, c, d)

const delayMsg = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
};

setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
delayMsg("#4: Not delayed at all");

let longTimeout = setTimeout(delayMsg, 11000, "#5: Delayed by 11 seconds");
clearTimeout(longTimeout); // Stops #5 from ever running

// 3. 'Debouncing' is a concept that refers to 'putting off' the execution of multiple, fast-timed,
//    similar requests until there's a brief pause, then only executing the most recent of those
//    requests.
//    It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server
//    requests being initiated if a user clicks repeatedly on a button.
//    Using the following code to test and start with:
//    a) Create a debounce(func) decorator, which is a wrapper that takes a function func and
//    suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second
//    pause, the most recent call to func should be executed and any others ignored.
//    b) Extend the debounce decorator function to take a second argument ms, which defines the
//    length of the period of inactivity instead of hardcoding to 1000ms
//    c) Extend debounce to allow the original debounced function printMe to take an argument
//    msg which is included in the console.log statement.

// Debounce function with optional delay and argument support
function debounce(func, ms = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), ms);
  };
}

// Function to be debounced
function printMe(msg) {
  console.log(`printing debounced message: ${msg}`);
}

// Applying debounce decorator
printMe = debounce(printMe, 1000);

// Fire off multiple calls, third should run
setTimeout(() => printMe("first"), 100);
setTimeout(() => printMe("second"), 200);
setTimeout(() => printMe("third"), 300);

// 5. The following car object has several properties and a method which uses them to print a
//    description. When calling the function normally this works as expected, but using it from
//    within setTimeout fails. Why?

// Why: Because setTimeout calls the function without context, so this becomes undefined or the
//  global object (window in browsers), not the car object. As a result, this.make, this.model,
// and this.year are undefined.

let car = {
  make: "Porsche",
  model: "911",
  year: 1964,

  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};
car.description(); //works
setTimeout(car.description, 200); //fails

//    a) Fix the setTimeout call by wrapping the call to car.description() inside a function
//    b) Change the year for the car by creating a clone of the original and overriding it
//    c) Does the delayed description() call use the original values or the new values from
//    b)? Why?
//    d) Use bind to fix the description method so that it can be called from within
//    setTimeout without a wrapper function
//    e) Change another property of the car by creating a clone and overriding it, and test that
//    setTimeout still uses the bound value from d)

// a) Fixing setTimeout call
setTimeout(() => car.description(), 200);

// b) Cloning the car object and changing the year
let newCar = { ...car, year: 2025 };
setTimeout(() => newCar.description(), 200);

// c)
// Yes because the setTimeout call is using the original car object, not the new one. The
//  setTimeout function captures the context of the car object at the time it was called, not when it was
//  created.

// d) Using bind to fix the description method
setTimeout(car.description.bind(car), 200);

// e) Changing another property of the car and testing setTimeout
let newCar2 = { ...car, model: "Cayman" };
setTimeout(car.description.bind(newCar2), 200); // still uses the bound value from d

// 6. Use the Function prototype to add a new delay(ms) function to all functions, which can
//    be used to delay the call to that function by ms milliseconds.

//    a) Use the example multiply function below to test it with, as above, and assume that all
//    delayed functions will take two parameters
//    b) Use apply to improve your solution so that delayed functions can take any number of
//    parameters
//    c) Modify multiply to take 4 parameters and multiply all of them, and test that your
//    delay prototype function still works.

// a) Add delay method to all functions
Function.prototype.delay = function (ms) {
  const fn = this;
  return function (...args) {
    setTimeout(() => fn.apply(this, args), ms);
  };
};

// b) Sample function that takes 4 parameters
function multiply(a, b, c, d) {
  console.log(a * b * c * d);
}
function multiply(a, b) {
  console.log(a * b);
}

// c) Call the multiply function with delay
multiply.delay(500)(2, 2, 2, 2); // Outputs 16 after 500ms
multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds

// 7. The following DigitalClock class uses an interval to print the time every second once
//    started, until stopped.

class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}
const myClock = new DigitalClock("my clock:");
myClock.start();

//    a) Create a new class PrecisionClock that inherits from DigitalClock and adds the
//    parameter precision – the number of ms between 'ticks'. This precision parameter
//    should default to 1 second if not supplied.
//    b) Create a new class AlarmClock that inherits from DigitalClock and adds the
//    parameter wakeupTime in the format hh:mm. When the clock reaches this time, it
//    should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should
//    default to 07:00 if not supplied.

// a) PrecisionClock class

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

// b) AlarmClock class
class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = "07:00") {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }
  start() {
    this.display();
    this.timer = setInterval(() => {
      this.display();
      let date = new Date();
      let currentTime = `${date.getHours()}:${date.getMinutes()}`;
      if (currentTime === this.wakeupTime) {
        console.log("Wake Up!");
        this.stop();
      }
    }, 1000);
  }
}

// 8. Using the following starter code, create a decorator function to validate function arguments
//    as strings. Test it by decorating the given orderItems function below.

function orderItems(itemName) {
  return `Order placed for: ${itemName}`;
}

//    a) Create a decorator function validateStringArg(fn) which will validate an
//    argument passed to fn to ensure that it is a string, throwing an error if not
//    b) Extend orderItems to use the ... rest operator, allowing multiple item name
//    arguments, and include them all in the returned string
//    c) Extend the decorator function to validate as strings all arguments passed to fn
//    d) When testing the decorated function, use try-catch blocks to handle errors thrown for
//    non-string arguments

// a) Decorator function to validate string arguments
function validateStringArg(fn) {
  return function (...args) {
    for (let arg of args) {
      if (typeof arg !== "string") {
        throw new Error("Invalid argument: must be a string");
      }
    }
    return fn(...args);
  };
}

// b) Extend orderItems to use rest operator
function orderItems(...itemNames) {
  return `Order placed for: ${itemNames.join(", ")}`;
}

// c) Extend the decorator function to validate all arguments
function validateStringArg(fn) {
  return function (...args) {
    for (let arg of args) {
      if (typeof arg !== "string") {
        throw new Error("Invalid argument: must be a string");
      }
    }
    return fn(...args);
  };
}

// d) Testing the decorated function with try-catch blocks
const validatedOrderItems = validateStringArg(orderItems);

// Test 1: Valid input
try {
  console.log(validatedOrderItems("Apple Watch", "AirPods"));
} catch (e) {
  console.error(e.message);
}

// Test 2: Invalid input
try {
  console.log(validatedOrderItems("iPhone", 12345)); // Throws error
} catch (e) {
  console.error(e.message); // Prints: All arguments must be strings
}

// 9. We can delay execution of a function using setTimeout, where we need to provide both
//    the callback function and the delay after which it should execute.
//    a) Create a promise-based alternative randomDelay() that delays execution for a
//    random amount of time (between 1 and 20 seconds) and returns a promise we can use
//    via .then(), as in the starter code below
//    b) If the random delay is even, consider this a successful delay and resolve the promise,
//    and if the random number is odd, consider this a failure and reject it
//    c) Update the testing code to catch rejected promises and print a different message
//    d) Try to update the then and catch messages to include the random delay value

// a-d)
function randomDelay() {
  // Generate a random delay between 1 and 20 seconds (in milliseconds)
  const delay = Math.floor(Math.random() * 20 + 1) * 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((delay / 1000) % 2 === 0) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Testing the promise
randomDelay()
  .then((delay) => {
    console.log(`There was a successful delay of ${delay / 1000} seconds.`);
  })
  .catch((delay) => {
    console.log(`Delay of ${delay / 1000} seconds failed (odd number).`);
  });

// 10.Fetch is a browser-based function to send a request and receive a response from a server,
//    which uses promises to handle the asynchronous response.
//    The below fetchURLData uses fetch to check the response for a successful status
//    code, and returns a promise containing the JSON sent by the remote server if successful
//    or an error if it failed. (To run this code in a node.js environment, follow the instructions in the
//    comments before the function.)
//    a) Write a new version of this function using async/await
//    b) Test both functions with valid and invalid URLs
//    c) (Extension) Extend your new function to accept an array of URLs and fetch all of them,
//    using Promise.all to combine the results.

// a) Using async/await
async function fetchURLData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// b) Testing with valid and invalid URLs

const validURL = "https://jsonplaceholder.typicode.com/posts/1";

const invalidURL = "https://invalid-url.com";

fetchURLData(validURL)
  .then((data) => {
    console.log("Data fetched successfully:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// c) Fetching multiple URLs using Promise.all
async function fetchMultipleURLs(urls) {
  try {
    const fetchPromises = urls.map((url) => fetchURLData(url));
    const results = await Promise.all(fetchPromises);
    return results;
  } catch (error) {
    console.error("Error fetching multiple URLs:", error);
  }
}
// Example usage
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://invalid-url.com",
];
fetchMultipleURLs(urls)
  .then((results) => {
    console.log("Fetched data from multiple URLs:", results);
  })
  .catch((error) => {
    console.error("Error fetching data from multiple URLs:", error);
  });
