function sum(a, b) {
  return a + b;
}

console.log(sum(13, 92));

const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const result = sentiment.analyze("Cats are stupid.");
console.log(result); // Score: -2, Comparative: -0.666
