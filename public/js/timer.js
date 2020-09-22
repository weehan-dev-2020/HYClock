const saveGrade = (gradeInput) => {
  try {
    gradeInput = parseInt(gradeInput);
    localStorage.setItem("univclock-userGrade", gradeInput);
  } catch (e) {
    console.log("saveGrade, catch E");
    gradeInput = "NaN";
  }
};

const askGrade = () => {
  const gradeForm = document.querySelector(".grade");
  gradeForm.classList.remove("invisible");
  gradeForm.addEventListener("submit", () => {
    const gradeForm = document.querySelector(".grade");
    const gradeInput = gradeForm.querySelector("select").value;
    saveGrade(gradeInput);
  });
};

const setGrade = () => {
  const grade = localStorage.getItem("univclock-userGrade");
  if (grade === "NaN" || grade === null) {
    const gradeInput = askGrade();
    saveGrade(gradeInput);
  } else {
  }
};

// 자동화 할 때는 -years로 계산합니다
// 12학번 이전은 어떻게 할 지 고민중
const getEnterDay = () => {
  const grade = localStorage.getItem("univclock-userGrade");
  if (grade === "12") {
    return new Date(2012, 01, 27);
  } else if (grade === "13") {
    return new Date(2013, 01, 27);
  } else if (grade === "14") {
    return new Date(2014, 01, 26);
  } else if (grade === "15") {
    return new Date(2015, 01, 25);
  } else if (grade === "16") {
    return new Date(2016, 01, 26);
  } else if (grade === "17") {
    return new Date(2017, 01, 27);
  } else if (grade === "18") {
    return new Date(2018, 01, 28);
  } else if (grade === "19") {
    return new Date(2019, 01, 28);
  } else if (grade === "20") {
    return new Date(2020, 01, 25);
  }
};

const resetGrade = () => {
  localStorage.removeItem("univclock-userGrade");
  setGrade();
};

const setStopwatch = (startDay) => {
  const timerEl = document.getElementById("stopwatch");
  if (startDay === "NaN" || startDay === null || startDay === undefined) {
    timerEl.innerText = `지금까지 한양과 ???일을 함께했습니다`;
  } else {
    const now = new Date();
    const time = now - startDay;
    const date = Math.floor(time / (1000 * 60 * 60 * 24));
    timerEl.innerHTML = `<span>지금까지 한양과 <button id="gradebutton" class="word can-change" style="padding: 0; margin:0px;">${date}</button>일을 함께했습니다</span>`;
    const gradebuttonEl = document.getElementById("gradebutton");
    gradebuttonEl.addEventListener("click", resetGrade);
  }
};
const setTimer = (dDay) => {
  const now = new Date();
  const time = new Date(dDay - now);
  const date = Math.floor(time / (1000 * 60 * 60 * 24));
  const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
  const timerEl = document.getElementById("timer");
  timerEl.innerText = `${date}일 ${hour}시간 ${time.getMinutes()}분 ${time.getSeconds()}초`;
};

const getDday = () => {
  let date = localStorage.getItem("dday");
  if (date) {
    return new Date(date);
  }
  return new Date(2020, 11, 21);
};

const saveDday = () => {
  const [date, time] = getTimeInput();
  const timeString = `${date.value}T${time.value}:00`;
  const t = new Date(timeString);
  localStorage.setItem("dday", t);
  setTimer(t);
  clearInterval(loop);
  loop = setInterval(setTimer, 1000, t);

  const input = document.getElementById("d-day-name-input");
  localStorage.setItem("dDayName", input.value);
  setDdayName();
};

const setDdayInput = (t) => {
  let [date, time] = getTimeInput();
  date.value = `${t.getFullYear()}-${("0" + String(t.getMonth() + 1)).slice(
    -2
  )}-${t.getDate()}`;
  const timeString = `${("0" + String(t.getHours())).slice(-2)}:${(
    "0" + String(t.getMinutes())
  ).slice(-2)}`;
  time.value = timeString;
  const saveButton = document.getElementById("save-dday-button");
  saveButton.addEventListener("click", saveDday);
};

const getDdayName = () => {
  const dDayName = localStorage.getItem("dDayName");
  if (dDayName) {
    return dDayName;
  }
  return "종강";
};

const setDdayName = () => {
  const dDayName = getDdayName();
  const input = document.getElementById("d-day-name-input");
  const dDayNameDisplay = document.getElementById("d-day-name");
  input.value = dDayName;
  dDayNameDisplay.innerText = dDayName;
};

let loop;

const loadTimer = () => {
  const dDay = getDday();
  const enterDay = getEnterDay();
  setTimer(dDay);
  setGrade();
  setStopwatch(enterDay);
  loop = setInterval(setTimer, 1000, dDay);
  setDdayInput(dDay);
  setDdayName();
};

window.addEventListener("load", loadTimer);
