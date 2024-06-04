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
