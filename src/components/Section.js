export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // перебор
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });

  }
  // вставка
  addItem(element) {
    this._container.prepend(element);
  }
}
