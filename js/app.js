// Search form
const form = document.getElementById("search");
form.addEventListener("submit", e => {
  e.preventDefault();
  const results = document.getElementById("results");
  results.innerHTML = "";
  results.style.display = "none";

  // Show loading message
  const loading = document.createElement("h2");
  loading.textContent = "Loading...";
  results.appendChild(loading);

  // make link using value from form
  const searchTerm = document.getElementById("searchTerm");
  const searchResults = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm.value + "&origin=*";

  // Get data from API
  const articles = new XMLHttpRequest();
  articles.onreadystatechange = function() {
    if (articles.readyState === 4) {
      if (articles.status === 200) {
        const article = JSON.parse(articles.responseText);

        // If no results found
        if (article[1].length === 0) {
          const noResults = document.createElement("h3");
          noResults.classList.add("no-results");
          noResults.textContent = `There were no results found for "${searchTerm.value}".`;
          results.appendChild(noResults);
          loading.style.display = "none";
          results.style.display = "block";
        } else {
          // Print results
          for(let i = 0; i < article[1].length; i++) {
            // Make elements
            const title = document.createElement("h3");
            title.classList.add("result-title");
            const link = document.createElement("a");
            link.classList.add("result");
            link.setAttribute("target", "_blank");

            // Put content in elements
            title.textContent = article[1][i];
            link.setAttribute("href", article[3][i]);
            link.appendChild(title);
            results.appendChild(link);

            loading.style.display = "none";
            results.style.display = "block";
          }
        }
      } else {
        alert("Error: " + articles.status);
      }
    }
  };
  articles.open("GET", searchResults);
  articles.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  articles.send();
});