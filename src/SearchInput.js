export class SearchInput {
  text = "";
  constructor({ $target, onSearch }) {
    const searchBox = document.createElement("section");
    const searchInput = document.createElement("input");
    const submitBtn = document.createElement("button");

    searchBox.className = "SearchBox";
    searchInput.className = "SearchInput";
    submitBtn.className = "SubmitBtn";
    submitBtn.innerText = "검색";

    this.searchBox = searchBox;
    this.searchInput = searchInput;
    this.submitBtn = submitBtn;

    searchBox.appendChild(searchInput);
    searchBox.appendChild(submitBtn);

    $target.appendChild(searchBox);

    searchInput.addEventListener("keyup", (e) => {
      this.setState(e.target.value);
      if (e.isComposing) return;
      if (e.key === "Enter") {
        onSearch(this.text);
      }
    });

    submitBtn.addEventListener("click", (e) => {
      if (this.text.length === 0) return;
      onSearch(this.text);
    });
  }

  setState(newState) {
    this.text = newState;
  }
}
