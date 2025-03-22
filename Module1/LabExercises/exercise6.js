let book = {
  title: "The Great Gatsby",
  description: "A novel set in the Roaring Twenties about wealth and love.",
  author: "F. Scott Fitzgerald",
  pages: 180,
};
console.log(book.title);
console.log(book.description);
console.log(book.author);
console.log(book.pages);

console.log(book);
book.description =
  "A classic novel exploring themes of wealth, excess, and the American Dream.";
console.log(book.description);

let books = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    description:
      "The beginning of Harry Potter’s journey as he discovers he is a wizard and attends Hogwarts.",
    author: "J.K. Rowling",
    pages: 309,
  },
  {
    title: "Choke",
    description:
      "A dark comedy about a sex addict who cons people by pretending to choke in restaurants.",
    author: "Chuck Palahniuk",
    pages: 293,
  },
  {
    title: "Kitchen Confidential",
    description:
      "Anthony Bourdain’s raw and entertaining look into the hidden world of professional kitchens.",
    author: "Anthony Bourdain",
    pages: 312,
  },
  {
    title: "Blink",
    description:
      "An exploration of rapid cognition and how people make snap judgments.",
    author: "Malcolm Gladwell",
    pages: 296,
  },
  {
    title: "The Midnight Library",
    description:
      "A woman finds a magical library where each book represents a different path her life could have taken.",
    author: "Matt Haig",
    pages: 288,
  },
];

console.log(books);
