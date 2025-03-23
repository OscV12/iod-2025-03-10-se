function testRollDice() {
  console.log(rollDice(6)); // Test D6, should return a value between 1 and 6
  console.log(rollDice(10)); // Test D10, should return a value between 1 and 10
  console.log(rollDice(0)); // Invalid input, should return null
  console.log(rollDice(-5)); // Invalid input, should return null
}

// Run tests
testRollDice();
