const todoMenuBtn = document.querySelector(".move-writepage-btn");
const todolistClick = document.querySelector(".todo-list-menu-wrap");

todoMenuBtn.addEventListener("click", () => {
  //   document.div.style.backgroundColor = "red";

  const classLength = todolistClick.classList.length;
  for (let i = 0; i < classLength; i++) {
    if (todolistClick.classList.item(i) === "todolistOff") {
      todolistClick.className = "todo-list-menu-wrap";
    } else {
      todolistClick.className += " todolistOff";
    }
  }
  console.log(todolistClick.className);
});

// window.addEventListener("load", function () {
//   const todoMenuBtn = document.querySelector(".header-menu");
//   const todolistClick = document.querySelector(".todo-list-menu-wrap");
//   let listOpen = false;
//   todoMenuBtn.addEventListener("click", function () {
//     if (listOpen) {
//       todolistClick.classList.remove("todolistOff");
//       listOpen = false;
//     } else {
//       todolistClick.classList.add("todolistOff");
//       listOpen = true;
//     }
//   });
// });
