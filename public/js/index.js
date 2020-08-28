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

const setTime = (userName) => {
  const d = new Date();
  const timeEl = document.getElementById("main-time");
  timeEl.innerText = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분, ${userName} 학우님이 한양과 함께한 지`;
};

const windowOnload = () => {
  const wordEl = document.getElementById("word");
  setBackground();
  const userName = getName();
  setTime(userName);
  setInterval(setTime, 1000, userName);
  const randomWord =
    config.wordList[Math.floor(Math.random() * config.wordList.length)];
  wordEl.innerText = randomWord;
};

window.addEventListener("load", windowOnload);
