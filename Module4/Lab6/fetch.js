fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("card-container");

    data.forEach((post) => {
      const col = document.createElement("div");
      col.className = "col-sm-12 col-md-6 col-lg-3 mb-4"; // Responsive: 1, 2, 4 per row

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = post.title;

      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = post.body;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      col.appendChild(card);
      container.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
