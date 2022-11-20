export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
  }

  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
