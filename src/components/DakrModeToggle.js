class DarkModeToggle {
  constructor($target) {
    const container = document.createElement("section");
    const toggleBtn = document.createElement("button");

    toggleBtn.innerText = "Dark";
    container.className = "DarkModeContainer";
    toggleBtn.className = "DarkModeBtn";

    this.toggleBtn = toggleBtn;
    container.appendChild(this.toggleBtn);
    $target.appendChild(container);

    const body = document.querySelector("body");

    if (body.classList.value === "") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add("dark-mode");
      } else {
        body.classList.add("light-mode");
      }
    }

    this.toggleBtn.addEventListener("click", () => {
      this.#changeMode();
    });
  }

  #changeMode() {
    const body = document.querySelector("body");

    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      this.toggleBtn.innerText = "Light";
    } else {
      this.toggleBtn.innerText = "Dark";
    }
  }
}

export default DarkModeToggle;
