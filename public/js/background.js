const setBackground = () => {
  const background = localStorage.getItem("univclock-background");
  if (background) {
    const root = document.getElementById("root");
    root.setAttribute(
      "style",
      `background-image: linear-gradient(0, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${background}")`
    );
  } else {
    const image = 'https://user-images.githubusercontent.com/52434876/92235629-f5b30a00-eeee-11ea-9e63-011b80177eaa.jpg'
    localStorage.setItem("univclock-background", image);
    setBackground();
  }
};

const uploadBackground = (e) => {
  const maxSize = 4 * 1000 * 1000;
  const fileSize = e.target.files[0].size;
  console.log(fileSize);
  if (fileSize >= maxSize) {
    alert("첨부파일 사이즈는 4MB 이내로 등록 가능합니다.");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    localStorage.setItem("univclock-background", reader.result);
    setBackground();
  };
  reader.readAsDataURL(e.target.files[0]);
};

const resetBackground = (e) => {
  localStorage.removeItem("univclock-background");
  setBackground();
};

const loadBackground = () => {
  const backgroundInput = document.getElementById("background-input");
  const resetBackgroundButton = document.querySelector(".reset-background");

  backgroundInput.addEventListener("change", uploadBackground);

  resetBackgroundButton.addEventListener("click", resetBackground);
};

window.addEventListener("load", loadBackground);
