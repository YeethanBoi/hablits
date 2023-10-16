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
    if (this.style.width == "100%") {
      this.style.width = "75%";
      this.style.borderRight = "10px #507c6a solid";
      this.style.borderTopRightRadius = "10px";
    } else {
      this.style.width = "100%";
      this.style.borderRight = "0px #507c6a solid";
      this.style.borderTopRightRadius = "0px";
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 300 + "px";
    }
  });
});
document.querySelectorAll(".panel").forEach((card) => {
  card.querySelectorAll("[data-tabs-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button;
      const tabsContainer = card.querySelector("#defaultTab");
      const tabsContentContainer = card.querySelector("#defaultTabContent");
      const target = tab.dataset.tabsTarget;
      const targetContent = card.querySelector(target);

      // Remove current active tab class
      const currentActiveTab = tabsContainer.querySelector(
        '[aria-selected="true"]',
      );
      if (currentActiveTab) {
        currentActiveTab.setAttribute("aria-selected", false);
        currentActiveTab.classList.remove("active");
      }

      // Set this tab as active
      tab.setAttribute("aria-selected", true);
      tab.classList.add("active");

      // Hide all tab content
      tabsContentContainer
        .querySelectorAll('[role="tabpanel"]')
        .forEach((panel) => {
          panel.classList.add("hidden");
        });

      // Show clicked tab content
      targetContent.classList.remove("hidden");
    });
  });
});
