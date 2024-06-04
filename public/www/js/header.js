const headerHtml = `
<div class="header-inner">
              <ul class="header-list">
                <li class="user-name">{username}<a href="#">더보기</a></li>
                <li class="search-box">
                  <input class="search-text" type="text" autocomplete="off" />
                </li>
                <li class="search"><a href="#"></a></li>
                <li class="menu"><a href="#"></a></li>
              </ul>
            </div>
`;

const headerClass = document.querySelector(".header");

headerClass.innerHTML = headerHtml;

// window.addEventListener("load", function () {
//   const search = document.querySelector(".icon-search");
//   const searchBox = document.querySelector(".header-search-box");

//   let searchOpen = false;

//   search.addEventListener("click", function () {
//     if (searchOpen) {
//       searchBox.classList.remove("header-search-box-active");
//       //   console.log("클로즈");
//       searchOpen = false;
//     } else {
//       searchBox.classList.add("header-search-box-active");
//       //   console.log("오픈");
//       searchOpen = true;
//     }
//   });
// });
