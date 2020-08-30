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
    gradeForm.addEventListener("submit", submitHandle);
}

const setGrade = () => {
    const grade = localStorage.getItem("univclock-userGrade");
    if (grade === 'NaN' || grade === null) {
        const gradeInput = askGrade();
        saveGrade(gradeInput);
    } else {
    }
};

// 자동화 할 때는 -years로 계산합니다
// 12학번 이전은 어떻게 할 지 고민중
const getEnterDay = () => {
    const grade = localStorage.getItem("univclock-userGrade");
    if (grade === '12') {
        return new Date(2012, 01, 24);
    } else if (grade === '13') {
        return new Date(2013, 01, 24);
    } else if (grade === '14') {
        return new Date(2014, 01, 24);
    } else if (grade === '15') {
        return new Date(2015, 01, 24);
    } else if (grade === '16') {
        return new Date(2016, 01, 24);
    } else if (grade === '17') {
        return new Date(2017, 01, 24);
    } else if (grade === '18') {
        return new Date(2018, 01, 24);
    } else if (grade === '19') {
        return new Date(2019, 01, 24);
    } else if (grade === '20') {
        return new Date(2020, 01, 24);
    }
}

const setStopwatch = (startDay) => {
    const timerEl = document.getElementById("stopwatch");
    if (startDay === 'NaN' || startDay === null || startDay === undefined) {
        timerEl.innerText = `지금까지 한양과 ???일을 함께했습니다`;
    } else {
        const now = new Date();
        const time = now - startDay;
        const date = Math.floor(time / (1000 * 60 * 60 * 24));
        timerEl.innerText = `지금까지 한양과 ${date}일을 함께했습니다`;
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

const loadTimer = () => {
    const dDay = new Date(2020, 11, 21);
    const enterDay = getEnterDay();
    setTimer(dDay);
    setGrade();
    setStopwatch(enterDay);
    setInterval(setTimer, 1000, dDay);
};

window.addEventListener("load", loadTimer);