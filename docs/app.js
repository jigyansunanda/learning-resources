let allResources = [];

async function init() {
  try {
    const res = await fetch("resources.json");
    allResources = await res.json();
    populateTags(allResources);
    renderCards(allResources);
  } catch (error) {
    console.error("Error loading resources:", error);
  }
}

function renderCards(resources) {
  const grid = document.getElementById("resources-grid");
  const count = document.getElementById("results-count");

  grid.innerHTML = "";
  count.textContent = `Showing ${resources.length} results`;

  resources.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const tagsHtml = item.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <h2><a href="${item.url}" target="_blank" rel="noopener">${item.name}</a></h2>
      <p>${item.notes}</p>
      <div class="tags">${tagsHtml}</div>
    `;
    grid.appendChild(card);
  });
}

function populateTags(resources) {
  const filter = document.getElementById("tag-filter");
  const tags = new Set();

  resources.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));

  Array.from(tags)
    .sort()
    .forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      filter.appendChild(option);
    });
}

function filterResources() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const selectedTag = document.getElementById("tag-filter").value;

  const filtered = allResources.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.notes.toLowerCase().includes(searchTerm);
    const matchesTag = selectedTag === "all" || item.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  renderCards(filtered);
}

document.getElementById("search").addEventListener("input", filterResources);
document
  .getElementById("tag-filter")
  .addEventListener("change", filterResources);

init();
