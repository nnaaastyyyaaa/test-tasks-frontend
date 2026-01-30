const images = document.querySelectorAll(".photo");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const deleteButton = document.querySelectorAll(".delete-image");

const header = document.createElement("h1");

const updateHeader = () => {
  const images = document.querySelectorAll(".photo");
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const now = new Date().toLocaleString("uk-UA", options);

  header.textContent = `Number of images: ${images.length}, Date: ${now}`;
};
updateHeader();
body.insertAdjacentElement("afterbegin", header);

images.forEach((image) => {
  image.addEventListener("click", () => {
    const srcImage = image.getElementsByTagName("img")[0].src;
    const modalImg = modal.querySelector(".image");
    modalImg.src = srcImage;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

body.addEventListener("click", (e) => {
  if (e.target === modal && modal.style.display === "flex")
    modal.style.display = "none";
});

deleteButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const photo = button.closest(".photo");
    photo.remove();
    updateHeader();
  });
});
