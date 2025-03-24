const { diceRoll } = require("./diceRoll.js");

// Testing single example
const result = diceRoll(6);
if (result > 6 || result < 1) {
  throw Error("Invalid dice result " + result);
}

// Unit tests - testing dice sides from 1 to 100
for (let i = 1; i < 100; i++) {
  let testResult = diceRoll(i);
  if (testResult > i || testResult < 1)
    throw Error("Invalid dice result " + testResult + " for max " + i);
}

console.log("All tests passed!");
