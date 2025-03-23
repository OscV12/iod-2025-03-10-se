document.getElementById("rollDice").addEventListener("click", function () {
  let diceType = document.getElementById("diceType").value;
  let result = Math.floor(Math.random() * diceType) + 1;
  document.getElementById("diceResult").textContent = result;
});
