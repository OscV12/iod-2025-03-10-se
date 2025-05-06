let news = [
  {
    id: 1,
    title: "Election Results",
    content: "Newly elected minister...",
  },
  { id: 2, title: "Sporting Success", content: "World Cup winners..." },
  {
    id: 3,
    title: "Tornado Warning",
    content: "Residents should prepare...",
  },
];

let intervalId = null;

function renderNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  news.forEach((item) => {
    const div = document.createElement("div");
    div.className = "news-item";

    const title = document.createElement("div");
    title.className = "news-title";
    title.textContent = item.title;

    const content = document.createElement("div");
    content.className = "news-content";
    content.textContent = item.content;

    div.appendChild(title);
    div.appendChild(content);
    container.appendChild(div);
  });
}

document.getElementById("news-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    news.push({
      id: news.length + 1,
      title: title,
      content: content,
    });

    this.reset();
  }
});

intervalId = setInterval(renderNews, 5000);
renderNews(); // Initial render

function stopUpdates() {
  clearInterval(intervalId);
  alert("Auto-refresh stopped.");
}
