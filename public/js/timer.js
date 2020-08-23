const setTimer = (dDay) => {
    const now = new Date();
    const time = dDay - now;
    const date = Math.floor(time / (1000 * 60 * 60 * 24));
    const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
    const min = Math.floor((time / (1000 * 60)) % 60);
    const sec = Math.floor((time / 1000) % 60);
    const timerEl = document.getElementById("timer");
    timerEl.innerText = `${date}일 ${hour}시 ${min}분 ${sec}초`;
};

const updateTimer = () => {
    const dDay = new Date(2020, 11, 21);
    setTimer(dDay);
    setInterval(setTimer, 1000, dDay);
};

window.addEventListener("load", updateTimer);