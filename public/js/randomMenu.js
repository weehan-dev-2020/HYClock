const rollMenu = () => {
  const roulette = document.querySelector(".roulette-items");
  let random = Math.round(getRandom(0, config.menuList.length));
  roulette.classList.add("rolling");
  setTimeout(() => {
    roulette.classList.remove("rolling");
    roulette.style["top"] = `-${60 * random - 60}px`;
  }, random * 50 + 1000);
};

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const setMenuHTML = () => {
  const rouletteEl = document.querySelector(".roulette-items");
  let menu;
  for (let i = 0; i < config.menuList.length; i++) {
    menu = document.createElement("div");
    menu.innerText = config.menuList[i];
    menu.classList.add("roulette-item");
    rouletteEl.appendChild(menu);
  }
};

const getMenuList = () => {
  fetch("http://127.0.0.1:8000/menulist", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then(async (response) => {
      const { data: menulist } = await response.json();
      config.menuList = menulist;
      setMenuHTML();
    })
    .catch(() => {
      setMenuHTML();
    });
};

const loadRandomMenu = () => {
  const rollButton = document.getElementById("roll-random-food");
  rollButton.addEventListener("mouseup", rollMenu);
  getMenuList();
};

window.addEventListener("load", loadRandomMenu);
