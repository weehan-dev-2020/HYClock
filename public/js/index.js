const setTime = () => {
  const d = new Date();
  const timeEl = document.getElementById("main-time");
  timeEl.innerText = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`;
};

const windowOnload = () => {
  const wordEl = document.getElementById("word");
  setBackground();
  setInterval(setTime, 1000);
  const randomWord =
    config.wordList[Math.floor(Math.random() * config.wordList.length)];
  wordEl.innerText = randomWord;
};

window.addEventListener("load", windowOnload);
