export class SearchInput {
  #text = "";
  #recentKeywordList = [];
  constructor({ $target, onSearch }) {
    const searchBar = document.createElement("section");
    const searchInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    const recentKeywordContainer = document.createElement("section");

    this.searchInput = searchInput;
    this.$target = $target;
    this.onSearch = onSearch;
    this.recentKeywordContainer = recentKeywordContainer;

    searchBar.className = "SearchBar";
    searchInput.className = "SearchInput";
    submitBtn.className = "SubmitBtn";
    recentKeywordContainer.className = "RecentKeywordContainer";

    searchInput.autofocus = true;
    searchInput.placeholder = "고양이를 검색해보세요.";
    submitBtn.innerText = "검색";

    searchBar.appendChild(searchInput);
    searchBar.appendChild(submitBtn);

    $target.appendChild(searchBar);
    $target.appendChild(this.recentKeywordContainer);

    searchInput.addEventListener("keyup", (e) => {
      this.setState(e.target.value);
      if (e.isComposing) return;
      if (e.key === "Enter") {
        onSearch(this.#text);
        this.#addRecentKeyword(this.#text);
      }
    });

    searchInput.addEventListener("focusin", (e) => {
      e.target.value = "";
    });

    submitBtn.addEventListener("click", () => {
      if (this.#text.length === 0) return;
      onSearch(this.#text);
      this.#addRecentKeyword(this.#text);
    });
  }

  #addRecentKeyword(keyword) {
    const size = this.#recentKeywordList.length;

    if (size >= 5) {
      this.#recentKeywordList.pop();
      this.#recentKeywordList.unshift(keyword);
    } else {
      this.#recentKeywordList.unshift(keyword);
    }

    this.#paintRecentKeyword();
  }

  #paintRecentKeyword() {
    this.recentKeywordContainer.innerHTML = "";

    const recentTitle = document.createElement("p");
    const recentButtonGroup = document.createElement("section");
    const frag = document.createDocumentFragment();

    recentTitle.innerText = "최근 검색어";
    recentButtonGroup.className = "ButtonGroup";

    this.recentKeywordContainer.appendChild(recentTitle);
    this.recentKeywordContainer.appendChild(recentButtonGroup);

    this.#recentKeywordList.forEach((keyword) => {
      const chip = document.createElement("button");
      chip.innerText = keyword;
      chip.addEventListener("click", () => {
        this.onSearch(keyword);
        this.searchInput.value = keyword;
      });
      frag.appendChild(chip);
    });
    recentButtonGroup.appendChild(frag);
    this.recentKeywordContainer.appendChild(recentButtonGroup);
  }

  setState(newState) {
    this.#text = newState;
  }
}
