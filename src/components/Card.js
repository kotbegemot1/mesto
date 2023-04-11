export default class Card {
  constructor(data, template, handleCardImageClick, deleteCardConfirm) {
    this._title = data[0];
    this._link = data[1];
    // console.log(this._title, this._link);
    this._template = template;
    this._handleCardImageClick = handleCardImageClick;
    this._deleteCardConfirm = deleteCardConfirm;
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

  _toggleLike= () => {
    console.log(this);
    this._elementLikeBtn.classList.toggle('element__like_active');
  }

  _deleteCard = () => {
    this._deleteCardConfirm()
    this._element.remove();
  }

  _handleImageClick = () => {
    this._handleCardImageClick(this._link, this._title);
  }

  _setEventListeners() {
    // слушатель лайков
    this._elementLikeBtn.addEventListener('click', this._toggleLike);
    // слушатель кнопки удаления
    this._elementDeleteBtn.addEventListener('click', this._deleteCard);
    // слушатель картинки
    this._elementImage.addEventListener('click', this._handleImageClick);
  }
}
