export class SearchInput {
  #text = "";
  constructor({ $target, onSearch }) {
    const searchBar = document.createElement("section");
    const searchInput = document.createElement("input");
    const submitBtn = document.createElement("button");

    searchBar.className = "SearchBar";
    searchInput.className = "SearchInput";
    submitBtn.className = "SubmitBtn";

    searchInput.autofocus = true;
    searchInput.placeholder = "고양이를 검색해보세요.";
    submitBtn.innerText = "검색";

    searchBar.appendChild(searchInput);
    searchBar.appendChild(submitBtn);

    $target.appendChild(searchBar);

    searchInput.addEventListener("keyup", (e) => {
      this.setState(e.target.value);
      if (e.isComposing) return;
      if (e.key === "Enter") {
        onSearch(this.#text);
      }
    });

    searchInput.addEventListener("focusin", (e) => {
      e.target.value = "";
    });

    submitBtn.addEventListener("click", () => {
      if (this.#text.length === 0) return;
      onSearch(this.#text);
    });
  }

  setState(newState) {
    this.#text = newState;
  }
}
