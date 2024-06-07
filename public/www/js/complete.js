// 추가기능 예정
// window.addEventListener("load", function () {
//   const checkbox = document.querySelector(".com-checkbox");
//   const listColor = document.querySelector(".complete-list");
//   console.log(checkbox);
//   checkbox.addEventListener("change", function () {
//     if (checkbox.checked) {
//       listColor.style.backgroundColor = "rgba(216, 218, 227, 1)";
//     } else {
//       listColor.style.backgroundColor = null;
//     }
//   });
// });

// 시작
window.addEventListener("load", function () {
  const dataUrl = "./apis/complete.json";
  fetch(dataUrl)
    .then(response => {
      const result = response.json();
      return result;
    })
    .then(result => {
      //   console.log(result);
      const listWhere = document.querySelector(".common-list-wrap");

      let listTags = "";

      result.forEach(item => {
        const tag = `<ul class="common-list">
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
        listTags += tag;
      });

      listWhere.innerHTML = listTags;
    })

    .catch(error => {
      console.log(error);
    });

  // 삭제 버튼 기능 구현
  const deleteBt = document.querySelector(".common-button-delete");
  deleteBt.addEventListener("click", function () {
    const selectedBoxes = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    console.log(selectedBoxes);
    if (selectedBoxes.length > 0) {
      selectedBoxes.forEach(item => {
        const listItem = item.closest(".common-list");
        listItem.remove();
      });
      alert("선택한 항목을 휴지통으로 이동합니다.");
    } else {
      alert("체크박스를 선택해주세요.");
    }
  });
});
