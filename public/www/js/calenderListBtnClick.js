const calenderListBtn = document.querySelector(".mycalender-btn");
const calenderList = document.querySelector(".div-mycalender-list");

calenderListBtn.addEventListener("click", () => {
  //   document.div.style.backgroundColor = "red";

  const classLength = calenderList.classList.length;
  for (let i = 0; i < classLength; i++) {
    if (calenderList.classList.item(i) === "calenderListOff") {
      calenderList.className = "div-calender div-mycalender-list";
    } else {
      calenderList.className += " calenderListOff";
    }
  }
  //   console.log(calenderList.className);
});
