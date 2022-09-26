class App {
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
