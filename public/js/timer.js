const saveGrade = (gradeInput) => {
    try {
        console.log("saveGrade");
        gradeInput = parseInt(gradeInput);
        console.log(gradeInput)
        localStorage.setItem("univclock-userGrade", gradeInput);
    }
    catch (e) {
        console.log("saveGrade, catch E");
        gradeInput = 'NaN';
    }
}

const submitHandle = () => {
    console.log("submitHandle");
    const gradeForm = document.querySelector(".grade");
    const gradeInput = gradeForm.querySelector("select").value;
    saveGrade(gradeInput);
}

const askGrade = () => {
    console.log("askGrade");
    const gradeForm = document.querySelector(".grade");
    gradeForm.classList.remove("invisible");
    gradeForm.addEventListener("submit", saveGrade);
}

const setGrade = () => {
    const grade = localStorage.getItem("univclock-userGrade");
    if (grade === 'NaN' || grade === null) {
        console.log(1)
        const gradeInput = askGrade();
        saveGrade(gradeInput);
    } else {
        console.log(2)
    }
};

const setStopwatch = (startDay) => {
    const now = new Date();
    const time = now - startDay;
    const date = Math.floor(time / (1000 * 60 * 60 * 24));
    const timerEl = document.getElementById("stopwatch");
    timerEl.innerText = `+ ${date}일`;
};

const setTimer = (dDay) => {
    const now = new Date();
    const time = new Date(dDay - now);
    const date = Math.floor(time / (1000 * 60 * 60 * 24));
    const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
    const timerEl = document.getElementById("timer");
    timerEl.innerText = `${date}일 ${hour}시간 ${time.getMinutes()}분 ${time.getSeconds()}초`;
};

const loadTimer = () => {
    const dDay = new Date(2020, 11, 21);
    const enterDay = new Date(2020, 01, 24);
    setTimer(dDay);
    setGrade();
    setStopwatch(enterDay);
    setInterval(setTimer, 1000, dDay);
};

window.addEventListener("load", loadTimer);