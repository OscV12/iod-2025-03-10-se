// exercise7.test.js

const { add, subtract, multiply, divide } = require("./exercise7");

console.log("Running Unit Tests...");

// Test add function
console.log(add(10, 5) === 15 ? "Add Passed" : "Add Failed");
console.log(add(0, 5) === 5 ? "Add Passed" : "Add Failed");
console.log(add(-3, 7) === 4 ? "Add Passed" : "Add Failed");

// Test subtract function
console.log(subtract(10, 5) === 5 ? "Subtract Passed" : "Subtract Failed");
console.log(subtract(0, 5) === -5 ? "Subtract Passed" : "Subtract Failed");
console.log(subtract(-3, -7) === 4 ? "Subtract Passed" : "Subtract Failed");

// Test multiply function
console.log(multiply(10, 5) === 50 ? "Multiply Passed" : "Multiply Failed");
console.log(multiply(0, 5) === 0 ? "Multiply Passed" : "Multiply Failed");
console.log(multiply(-3, 7) === -21 ? "Multiply Passed" : "Multiply Failed");

// Test divide function
console.log(divide(10, 5) === 2 ? "Divide Passed" : "Divide Failed");
console.log(divide(0, 5) === 0 ? "Divide Passed" : "Divide Failed");
console.log(divide(5, 0) === null ? "Divide Passed" : "Divide Failed");
