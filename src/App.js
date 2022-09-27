import { SearchInput } from "./components/SearchInput.js";
import { getCatImages } from "./api/api.js";

export class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        getCatImages(keyword).then((res) => {
          const { data } = res;
          console.log(data);
        });
      },
    });
  }
}
