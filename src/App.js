import { SearchInput } from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import { getCatImages } from "./api/api.js";

export class App {
  $target = null;
  catList = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        getCatImages(keyword).then((res) => {
          const { data } = res;
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({ $target, catList: this.catList });
  }

  setState(newValue) {
    this.catList = newValue;
    this.searchResult.setState(newValue);
  }
}
