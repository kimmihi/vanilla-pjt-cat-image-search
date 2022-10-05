class SearchResult {
  constructor({ $target, catList, onClick }) {
    const container = document.createElement("article");
    container.className = "ResultContainer";

    this.target = $target;
    this.catList = catList;
    this.onClick = onClick;
    this.container = container;

    this.target.appendChild(this.container);

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 30px 0px",
        threshold: 0.2,
      }
    );

    this.render();
  }

  setState(newValue) {
    this.catList = newValue;
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    const frag = document.createDocumentFragment();
    if (this.catList) {
      this.catList.forEach((cat) => {
        const image = document.createElement("img");
        image.className = "CatImage";
        image.setAttribute("data-src", cat.url);

        image.addEventListener("click", () => {
          this.onClick(cat.id);
        });
        this.observer.observe(image);
        frag.appendChild(image);
      });
      this.container.appendChild(frag);
    }
  }
}

export default SearchResult;
