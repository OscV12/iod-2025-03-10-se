let states = ["Virginia", "Texas", "Florida", "New York", "California"];

states[1] = "Georgia";
states[4] = "Washington";

states.unshift("Oregon");

states.pop();

console.log(states);
