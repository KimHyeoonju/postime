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
//   const search = document.querySelector(".search");
//   const searchBox = document.querySelector(".search-box");

//   let searchOpen = false;

//   search.addEventListener("click", function () {
//     if (searchOpen) {
//       searchBox.classList.remove("search-box-active");
//       //   text.classList.remove(".search-text-open");
//       //   console.log("클로즈");
//       searchOpen = false;
//     } else {
//       searchBox.classList.add("search-box-active");
//       //   text.classList.add(".search-text-open");
//       //   console.log("오픈");
//       searchOpen = true;
//     }
//   });
// });
