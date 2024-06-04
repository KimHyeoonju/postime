window.addEventListener("keydown", function (event) {
  const textarea = document.querySelector("#write-header-title");
  // 이벤트가 발생한 요소가 textarea인지 확인
  if (event.target === textarea && event.key === "Enter") {
    event.preventDefault();
  }
});
