import { SearchInput } from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import DetailCatDialog from "./components/DetailCatDialog.js";
import LoadingIndicator from "./components/LoadingIndicator.js";
import DarkModeToggle from "./components/DakrModeToggle.js";
import { getCatItem, getCatImages, getRandomCat } from "./api/api.js";

export class App {
  $target = null;
  catList = [];

  constructor($target) {
    this.$target = $target;

    const divdier = document.createElement("hr");
    divdier.className = "Divider";

    new DarkModeToggle($target);
    this.loader = new LoadingIndicator($target);
    this.detailCatDialog = new DetailCatDialog($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loader.render();
        try {
          const { data } = await getCatImages(keyword);
          this.loader.hide();
          this.searchResult.setState(data);
        } catch {
          this.loader.hide();
        }
      },
      onRandom: async () => {
        this.loader.render();
        try {
          const { data } = await getRandomCat();
          this.loader.hide();
          this.searchResult.setState(data);
        } catch {
          this.loader.hide();
        }
      },
    });

    this.$target.appendChild(divdier);

    this.searchResult = new SearchResult({
      $target,
      onClick: async (catId) => {
        try {
          const { data } = await getCatItem(catId);
          this.detailCatDialog.open(data);
        } catch {
          console.log("Error");
        }
      },
    });
  }

  setState(newValue) {
    this.catList = newValue;
    this.searchResult.setState(newValue);
  }
}
