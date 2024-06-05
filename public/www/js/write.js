window.addEventListener("keydown", function (event) {
  const textarea = document.querySelector("#write-header-title");
  // 이벤트가 발생한 요소가 textarea인지 확인
  if (event.target === textarea && event.key === "Enter") {
    event.preventDefault();
  }
});

// 이미지 업로드 버튼 관련
window.addEventListener("load", () => {
  const imgUploadBt = document.querySelector(".img-upload-button");
  const imgUpload = document.querySelector(".img-upload");

  imgUpload.addEventListener("click", () => imgUploadBt.click());
});
