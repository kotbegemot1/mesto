export default class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // перебор
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });

  }
  // вставка
  addItem(element) {
    this._container.prepend(element);
  }
}
