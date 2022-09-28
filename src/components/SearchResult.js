class SearchResult {
  constructor({ $target, catList }) {
    const container = document.createElement("div");
    container.className = "Result-Container";

    this.target = $target;
    this.catList = catList;
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
    if (this.catList) {
      this.catList.forEach((cat) => {
        const image = document.createElement("img");
        image.className = "Cat-Image";
        image.setAttribute("data-src", cat.url);

        this.observer.observe(image);
        this.container.appendChild(image);
      });
    }
  }
}

export default SearchResult;
