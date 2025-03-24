(function () {
  // Dice roll function
  function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  // Checking if running in the browser (where `document` exists)
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
      // DOM Elements
      const diceType = document.getElementById("diceType");
      const rollButton = document.getElementById("rollDice");
      const resultDisplay = document.getElementById("diceResult");

      // Event listener for button click
      rollButton.addEventListener("click", () => {
        const sides = parseInt(diceType.value, 10);
        if (isNaN(sides) || sides <= 0) {
          resultDisplay.textContent =
            "Invalid dice type! Enter a number greater than 0.";
          return;
        }
        const result = rollDice(sides);
        resultDisplay.textContent = `${result}`;
      });
    });
  }

  // Export for Node.js testing
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { rollDice };
  }
})();
