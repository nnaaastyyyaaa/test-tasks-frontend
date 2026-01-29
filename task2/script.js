const images = document.querySelectorAll(".photo");
const body = document.querySelector("body");

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const now = new Date().toLocaleString("uk-UA", options);

body.insertAdjacentHTML(
  "beforebegin",
  `<h1>Number of images: ${images.length}, Date: ${now}</h1>`,
);
