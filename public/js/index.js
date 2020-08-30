const saveName = (nameInput) => {
  try {
    localStorage.setItem("univclock-userName", nameInput);
  }
  catch (e) {
    nameInput = "";
  }
}

const askName = () => {
  const gradeForm = document.querySelector(".name");
  gradeForm.classList.remove("invisible");
  gradeForm.addEventListener("submit", () => {
    const nameForm = document.querySelector(".name");
    const nameInput = nameForm.querySelector("input").value;
    saveName(nameInput);
  });
}

const getName = () => {
  let userName = localStorage.getItem("univclock-userName");
  if (userName === null) {
    userName = ""
    askName();
  }
  return userName;
}

const setName = () => {
  let userName = getName();
  if (userName === null || userName === '') {
    userName = "학우"
  }
  const nameEl = document.getElementById("name");
  nameEl.innerText = `${userName}님의 종강까지 남은 시간`
}

const setTime = () => {
  const d = new Date();
  const timeEl = document.getElementById("main-time");
  timeEl.innerText = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분,`;
};

const windowOnload = () => {
  const wordEl = document.getElementById("word");
  setBackground();
  setName();
  setTime();
  setInterval(setTime, 1000);
  const randomWord =
    config.wordList[Math.floor(Math.random() * config.wordList.length)];
  wordEl.innerText = randomWord;
};

window.addEventListener("load", windowOnload);
