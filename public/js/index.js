const getCookie = (what) => {
  if (what === "background") {
    return "../../src/image/default-background.jpg";
  }
};
const setTime = () => {
  const d = new Date();
  const timeEl = document.getElementById("main-time");
  timeEl.innerText = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`;
};
const windowOnload = () => {
  const root = document.getElementById("root");
  const background = getCookie("background");
  const wordEl = document.getElementById("word");
  root.setAttribute("style", `background-image: url("${background}")`);
  setInterval(setTime, 1000);
  const randomWord =
    config.wordList[Math.floor(Math.random() * config.wordList.length)];
  wordEl.innerText = randomWord;
};

window.addEventListener("load", windowOnload);
