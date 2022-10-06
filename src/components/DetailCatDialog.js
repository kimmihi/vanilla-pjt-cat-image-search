class DetailCatDialog {
  cat = {};
  constructor($target) {
    const dialogContainer = document.createElement("section");
    const dialog = document.createElement("div");
    const dialogTitle = document.createElement("div");
    const dialogContent = document.createElement("div");
    const catName = document.createElement("h3");
    const catImage = document.createElement("img");
    const closeButton = document.createElement("button");

    dialogContainer.className = "DialogContainer";
    dialog.className = "Dialog";
    dialogTitle.className = "DialogTitle";
    dialogContent.className = "DialogContent";
    catName.className = "CatItemName";
    catImage.className = "CatImage";
    closeButton.className = "DialogCloseBtn";

    dialogContainer.style.display = "none";

    closeButton.innerText = "X";

    this.catName = catName;
    this.catImage = catImage;
    this.dialogTitle = dialogTitle;

    dialogContainer.appendChild(dialog);
    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogContent);
    dialogTitle.appendChild(catName);
    dialogTitle.appendChild(closeButton);
    dialogContent.appendChild(catImage);

    this.dialogContainer = dialogContainer;
    $target.appendChild(this.dialogContainer);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });

    dialogContainer.addEventListener("click", (e) => {
      const target = e.target.className;

      if (target === "DialogContainer") {
        this.close();
      }
    });

    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  close() {
    this.dialogContainer.style.display = "none";
  }

  open(cat) {
    this.dialogContainer.style.display = "flex";
    this.dialogTitle.style.display = "flex";
    this.setState(cat);
  }

  setState(newCat) {
    this.cat = newCat;
    this.#render(newCat);
  }

  #render(cat) {
    this.catName.innerText = cat.name;
    this.catImage.src = cat.url;
  }
}

export default DetailCatDialog;
