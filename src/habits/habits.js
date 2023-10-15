// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwind
import "../styles/main.css";
const loader = document.getElementById("loader");
loader.style.display = "none";

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("expanded");
  });
});

document.querySelectorAll(".accordion").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.parentElement.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
