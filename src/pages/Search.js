const Search = () => {
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
      displayResults(searchResults); // 검색 결과를 HTML에 출력
    });

    function displayResults(searchResults) {
      console.log(searchResults);
      let listTags = "";

      if (searchResults.length > 0) {
        searchResults.forEach(item => {
          const tags = `<ul class="complete-list">
          <li class="checkbox-area">
            <input type="checkbox" class="com-checkbox" value=${item.id} />
          </li>
          <li class="title-area">
            <span class="com-title">${item.title}</span>
          </li>
          <li class="text-area">
            <span class="com-text">
              ${item.subtitle}  
            </span>
          </li>
          <li class="date-area">
            <span class="com-date">${item.date}</span>
          </li>
          <li class="calender-area">
            <span class="com-calender">${item.calName}</span>
          </li>
        </ul>`;
          listTags += tags;
        });
        console.log(listTags);
      } else {
        listTags = "<p>검색결과가 없습니다</p>";
      }

      resultsContainer.innerHTML = listTags;
    }
  });

  return (
    <div className="common">
      <div className="common-inner">
        <h1>검색결과 페이지</h1>
        <div className="common-button">
          <button className="common-button-modify">
            <span>수정</span>
          </button>
          <button className="common-button-delete">
            <span>삭제</span>
          </button>
        </div>
        <div className="common-menu">
          <div className="cmt">
            <span>일정 명</span>
          </div>
          <div className="cmtxt">
            <span> 일정 내용 </span>
          </div>
          <div className="cmdate">
            <span>날짜</span>
          </div>
          <div className="cmcalender">
            <span>캘린더 명</span>
          </div>
        </div>

        <div className="common-list-wrap"></div>
      </div>
    </div>
  );
};

export default Search;
