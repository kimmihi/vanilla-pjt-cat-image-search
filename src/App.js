import { SearchInput } from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import DetailCatDialog from "./components/DetailCatDialog.js";
import LoadingIndicator from "./components/LoadingIndicator.js";
import { getCatItem, getCatImages } from "./api/api.js";

export class App {
  $target = null;
  catList = [];

  constructor($target) {
    this.$target = $target;

    const divdier = document.createElement("hr");
    divdier.className = "Divider";

    this.loader = new LoadingIndicator($target);
    this.detailCatDialog = new DetailCatDialog($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.setState([]);
        this.loader.render();
        getCatImages(keyword)
          .then((res) => {
            this.loader.hide();
            const { data } = res;
            if (data.length) {
              this.setState(data);
              return;
            }
            console.log("결과가없습니다.");
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });

    this.$target.appendChild(divdier);

    this.searchResult = new SearchResult({
      $target,
      catList: this.catList,
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
