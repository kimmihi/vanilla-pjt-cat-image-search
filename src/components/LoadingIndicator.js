class LoadingIndicator {
  constructor($target) {
    const loader = document.createElement("div");
    loader.className = "Loader";

    this.target = $target;
    this.loader = loader;
  }

  hide() {
    this.loader.style.display = "none";
  }

  render() {
    this.loader.style.display = "block";
    this.target.appendChild(this.loader);
  }
}

export default LoadingIndicator;
