const getCookie = (what) => {
  if (what === "background") {
    return "../src/image/default-background.jpeg";
  }
};

window.onload = () => {
  const root = document.getElementById("root");
  const background = getCookie("background");
  root.setAttribute(
    "style",
    `background-image:linear-gradient(rgba(255,255,255, 0.75), rgba(255,255,255, 0.25)), url("${background}")`
  );
};
