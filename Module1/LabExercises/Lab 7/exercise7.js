// Functions for the 4 main mathematical operations

// Addition function
function add(a, b) {
  return a + b;
}

// Subtraction function
function subtract(a, b) {
  return a - b;
}

// Multiplication function
function multiply(a, b) {
  return a * b;
}

// Division function
function divide(a, b) {
  if (b === 0) {
    console.log("Error: Division by zero is not allowed.");
    return null;
  }
  return a / b;
}

// Output the results
let num1 = 10;
let num2 = 5;

console.log("Addition: " + add(num1, num2)); // 10 + 5 = 15
console.log("Subtraction: " + subtract(num1, num2)); // 10 - 5 = 5
console.log("Multiplication: " + multiply(num1, num2)); // 10 * 5 = 50
console.log("Division: " + divide(num1, num2)); // 10 / 5 = 2

// Export functions (for Node.js or testing frameworks)
if (typeof module !== "undefined") {
  module.exports = { add, subtract, multiply, divide };
}
