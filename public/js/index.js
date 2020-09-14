const saveName = (nameInput) => {
  try {
    localStorage.setItem("univclock-userName", nameInput);
  } catch (e) {
    nameInput = "";
  }
};

const askName = () => {
  const gradeForm = document.querySelector(".name");
  gradeForm.classList.remove("invisible");
  gradeForm.addEventListener("submit", () => {
    const nameForm = document.querySelector(".name");
    const nameInput = nameForm.querySelector("input").value;
    saveName(nameInput);
  });
};

const getName = () => {
  let userName = localStorage.getItem("univclock-userName");
  if (userName === null) {
    userName = "";
    askName();
  }
  return userName;
};
const setLinks = (link) => {
  const links = getLinks();
  links.push(link);
  localStorage.setItem("links", JSON.stringify(links));
};

const getLinks = () => {
  let links = localStorage.getItem("links");
  if (links === null) {
    localStorage.setItem("links", JSON.stringify(config.links));
    return config.links;
  }
  return JSON.parse(links);
};

const loadLinks = (e) => {
  const links = getLinks();
  const template = document.querySelector("#link-template");
  const wrapper = document.querySelector(".link-wrapper");
  wrapper.innerHTML = "";
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const clone = document.importNode(template.content, true);
    clone.querySelector("a").setAttribute("href", link.href);
    clone
      .querySelector(".favorite-icon")
      .setAttribute(
        "src",
        `https://www.google.com/s2/favicons?domain=${link.href}`
      );
    clone.querySelector(".link-name").innerText = link.name;
    wrapper.append(clone);
  }
};

const addLinks = (name, href) => {
  const link = {
    name,
    href,
  };
  setLinks(link);
  loadLinks();
};

const resetName = () => {
  localStorage.removeItem("univclock-userName");
  getName();
};

const setName = () => {
  let userName = getName();
  if (userName === null || userName === "") {
    userName = "학우";
  }
  const nameEl = document.getElementById("name");
  nameEl.innerHTML = `<span><button id="namebutton" class="word" style="padding:0;">${userName}</button>님의 종강까지 남은 시간</span>`;
  const namebuttonEl = document.getElementById("namebutton");
  namebuttonEl.addEventListener("click", resetName);
};

const setTime = () => {
  const d = new Date();
  const timeEl = document.getElementById("main-time");
  timeEl.innerText = `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분,`;
};

const getWordList = () => {
  const wordEl = document.getElementById("word");
  fetch("https://hyclock.hanyang.life/wordlist", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then(async (response) => {
      const { data: wordList } = await response.json();
      config.wordList = wordList;
      const randomWord =
        config.wordList[Math.floor(Math.random() * config.wordList.length)];
      wordEl.innerText = randomWord;
    })
    .catch((err) => {
      wordEl.innerText =
        "대충 검은 화면에 흰 글씨 쓰면 명언같아 보인다 - 침착맨";
    });
};

const resetModal = (e) => {
  let modalList = document.querySelectorAll("input.open-check");

  for (let i = 0; i < modalList.length; i++) {
    if (modalList[i] !== e.target) {
      modalList[i].checked = false;
    }
  }
};

const setModalEvent = () => {
  let modalList = document.querySelectorAll("input.open-check");
  for (let i = 0; i < modalList.length; i++) {
    modalList[i].addEventListener("change", resetModal);
  }
};

const windowOnload = () => {
  setBackground();
  setName();
  setTime();
  setInterval(setTime, 1000);
  getWordList();
  setModalEvent();
  loadLinks();
};

window.addEventListener("load", windowOnload);
