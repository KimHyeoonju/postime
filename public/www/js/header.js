const headerHtml = ` <div class="header"><div class="header-inner">
<ul class="header-list">
  <li class="header-user-name">{username}<a href="#">V</a></li>
  <li class="search-box">
    <input class="search-text" type="text" autocomplete="off" />
  </li>
  <li class="header-search"><a href="#"></a></li>
  <li class="header-menu"><a href="#"></a></li>
</ul>
<div class="header-more">
  <div class="header-my">마이페이지</div>
  <div class="header-logout">로그아웃</div>
</div>
</div>
</div>
`;

const headerClass = document.querySelector(".header");

headerClass.innerHTML = headerHtml;

// 검색 박스
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

// 마이페이지로그인 메뉴
window.addEventListener("load", function () {
  const moreBt = document.querySelector(".header-user-name a");
  const moreTag = document.querySelector(".header-more");
  // console.log(moreBt);
  // console.log(moreTag);
  let moreOpen = false;
  moreBt.addEventListener("click", function () {
    // console.log("클릭됐어");
    if (moreOpen) {
      moreTag.classList.remove("header-more-open");
      moreOpen = false;
      // console.log(moreOpen);
    } else {
      moreTag.classList.add("header-more-open");
      moreOpen = true;
      // console.log(moreOpen);
    }
  });
});
