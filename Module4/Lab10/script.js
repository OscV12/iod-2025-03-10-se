const productContainer = document.getElementById("productContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let allProducts = [];

// Fetch products from API
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    populateCategories(data);
    filterAndDisplay();
  });

function populateCategories(products) {
  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-sm-12 col-md-6 col-lg-3";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top p-3" alt="${
      product.title
    }" style="height: 200px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description.substring(0, 100)}...</p>
          <p class="card-text fw-bold">$${product.price}</p>
        </div>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

function filterAndDisplay() {
  const category = categorySelect.value;
  const search = searchInput.value.toLowerCase();
  const sort = sortSelect.value;

  let filtered = allProducts.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.title.toLowerCase().includes(search)
  );

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  displayProducts(filtered);
}

categorySelect.addEventListener("change", filterAndDisplay);
searchInput.addEventListener("input", filterAndDisplay);
sortSelect.addEventListener("change", filterAndDisplay);
