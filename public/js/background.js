const backgroundInput = document.getElementById("background-input");
const resetBackground = document.querySelector(".reset-background");

const setBackground = () => {
  const background = localStorage.getItem("univclock-background");
  if (background) {
    const root = document.getElementById("root");
    root.setAttribute(
      "style",
      `background-image: linear-gradient(0, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${background}")`
    );
  } else {
    root.removeAttribute("style");
  }
};

backgroundInput.addEventListener("change", (e) => {
  const maxSize = 3 * 1024 * 1024;
  const fileSize = e.target.files[0].size;
  console.log(fileSize / 1024 / 1024);
  if (fileSize > maxSize) {
    alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    localStorage.setItem("univclock-background", reader.result);
    setBackground();
  };
  reader.readAsDataURL(e.target.files[0]);
});

resetBackground.addEventListener("click", (e) => {
  localStorage.removeItem("univclock-background");
  setBackground();
});
