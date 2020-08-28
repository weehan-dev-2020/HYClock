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

const loadRandomMenu = () => {
  const rollButton = document.getElementById("roll-random-food");
  const roulette = document.querySelector(".roulette-items");

  rollButton.addEventListener("mouseup", rollMenu);

  let menu;
  for (let i = 0; i < config.menuList.length; i++) {
    menu = document.createElement("div");
    menu.innerText = config.menuList[i];
    menu.classList.add("roulette-item");
    roulette.appendChild(menu);
  }
};

window.addEventListener("load", loadRandomMenu);
