function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomPhrase() {
  const phrases = [
    "Welcome to the Universe!",
    "Exploring the World!",
    "JavaScript is Fun!",
    "Change is Good!",
    "Hello from the Other Side!",
    "Keep Learning!",
    "Coding is Awesome!",
    "Enjoy the Journey!",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

document.getElementById("btn1").addEventListener("click", function () {
  document.getElementById("column1").style.backgroundColor = getRandomColor();
  document.getElementById("column2").style.backgroundColor = getRandomColor();
});

document.getElementById("btn2").addEventListener("click", function () {
  const inputText = document.getElementById("input2").value;

  if (inputText) {
    document.getElementById("heading2").textContent = inputText;
  } else {
    alert(
      "Please enter some text for the heading. A random phrase will be used instead."
    );
    document.getElementById("heading2").textContent = getRandomPhrase();
  }
});

document.getElementById("btn1").addEventListener("click", function () {
  const inputText = document.getElementById("input1").value;
  if (inputText) {
    document.getElementById("heading1").textContent = inputText;
  } else {
    alert("Please enter some text for the heading.");
  }
});
