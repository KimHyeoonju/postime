window.addEventListener("load", function () {
  const searchInput = document.querySelector(".search-text");
  const searchButton = document.querySelector(".header-search");
  const resultsContainer = document.querySelector(".complete-list-wrap");

  let data = [];

  // JSON 파일을 가져와 data 변수에 할당
  fetch("./apis/complete.json")
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
      console.log(data);
    });

  function performSearch(query) {
    return data.filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()),
    );
  }

  searchButton.addEventListener("click", () => {
    const searchResults = performSearch(searchInput.value);
    console.log(searchResults);
    window.location.href = "http://127.0.0.1:5500/public/www/search.html";
  });
});
