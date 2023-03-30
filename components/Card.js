export default class Card {
  constructor({name, link}, template, handleCardImageClick) {
    this._title = name;
    this._link = link;
    // console.log(this._title, this._link);
    this._template = template;
    this._handleCardImageClick = handleCardImageClick
  }
  // получение шаблона
  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement
  }
  // генерация самого элемента
  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeBtn = this._element.querySelector('.element__like');
    this._elementDeleteBtn = this._element.querySelector('.element__delete');

    this._elementImage.alt = this._title;
    this._elementImage.src = this._link;
    this._element.querySelector('.element__text').textContent = this._title;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    // слушатель лайков
    this._elementLikeBtn.addEventListener('click', evt => evt.target.classList.toggle('element__like_active'));

    // слушатель кнопки удаления
    this._elementDeleteBtn.addEventListener('click', () => this._element.remove());

    // слушатель картинки
    this._elementImage.addEventListener('click', () => {
      this._handleCardImageClick(this._link, this._title);
    });
  }
}
