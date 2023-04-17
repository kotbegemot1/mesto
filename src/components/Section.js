export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // перебор
  renderItems(items, userId) {
    items.forEach(item => {
      this._renderer(item, userId);
    });

  }
  // вставка
  addItem(element) {
    this._container.prepend(element);
  }
}
