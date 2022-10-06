class SearchResult {
  #catList = [];
  constructor({ $target, onClick }) {
    const container = document.createElement("section");
    container.className = "ResultContainer";

    this.target = $target;
    this.onClick = onClick;

    this.target.appendChild(container);

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

    this.#render();
  }

  setState(newValue) {
    this.#catList = newValue;
    this.#render();
  }

  #render() {
    const frag = document.createDocumentFragment();
    const container = document.querySelector(".ResultContainer");
    container.innerHTML = "";

    if (this.#catList) {
      this.#catList.forEach((cat) => {
        const image = document.createElement("img");
        image.className = "CatImage";
        image.setAttribute("data-src", cat.url);

        image.addEventListener("click", () => {
          this.onClick(cat.id);
        });

        this.observer.observe(image);
        frag.appendChild(image);
      });
      container.appendChild(frag);
    }
  }
}

export default SearchResult;
