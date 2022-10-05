import { getCatItem } from "../api/api.js";

class DetailCatDialog {
  cat = {};
  constructor($target) {
    const dialogContainer = document.createElement("div");
    const dialog = document.createElement("div");
    const dialogTitle = document.createElement("div");
    const dialogContent = document.createElement("div");
    const catName = document.createElement("p");
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
    catImage.style.width = "100%";

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

    closeButton.addEventListener("click", () => {
      this.close();
    });

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
  }

  close() {
    this.dialogContainer.style.display = "none";
  }

  open(cat) {
    this.dialogContainer.style.display = "flex";
    this.dialogTitle.style.display = "flex";
    this.setState(cat);
  }

  async request(catId) {
    try {
      const { data } = await getCatItem(catId);
      this.setState(data);
    } catch {
      console.log("Error");
    }
  }

  setState(newCat) {
    this.cat = newCat;
    console.log(newCat);
    this.render(newCat);
  }

  render(cat) {
    this.catName.innerText = cat.name;
    this.catImage.src = cat.url;
  }
}

export default DetailCatDialog;
