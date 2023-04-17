export default class Card {
  constructor(item, userId, template, handleCardImageClick, handleDeleteClick, handleAddlike, handleDeletelike) {
    // console.log(item);
    this._card = item;
    this._name = item.name;
    this._link = item.link;
    this._cardId = item._id;
    this._card = item;
    // console.log(this._likes);

    this._ownerId = item.owner._id;
    this._userId = userId;
    this._ownerCheker = this._ownerId !== this._userId;

    this._template = template;

    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddlike = handleAddlike;
    this._handleDeletelike = handleDeletelike;
  }

  // получение шаблона
  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement
    }

  likeChecker() {
    return this._likes.some(like => this._userId === like._id)
  }

  // генерация самого элемента
  generateCard = () => {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeBtn = this._element.querySelector('.element__like');
    this._elementDeleteBtn = this._element.querySelector('.element__delete');
    this._elementLikes = this._element.querySelector('.element__like-counter');
    this._elementText = this._element.querySelector('.element__text');

    if (this._ownerCheker) {
      this._elementDeleteBtn.remove();
    }

    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._elementText.textContent = this._name;
    this.updateLike(this._card);
    this._setEventListeners();
    return this._element;
  }

  updateLike(card) {
    // console.log(card);
    this._likes = card.likes
    this._elementLikes.textContent = this._likes.length;
    if (this.likeChecker()){
      this._elementLikeBtn.classList.add('element__like_active');
    } else {
      this._elementLikeBtn.classList.remove('element__like_active');
    }
  }

  _toggleLike = () => {
    if (this.likeChecker()) {
      console.log('like');
      this._handleDeletelike(this, this._cardId);

    } else {
      console.log('not like');
      this._handleAddlike(this, this._cardId);
    }
  }

  _handleDelete = () => {
    this._handleDeleteClick(this._element, this._cardId);
  }

  _handleImageClick = () => {
    this._handleCardImageClick(this._link, this._name);
  }

  _setEventListeners() {
    // слушатель лайков
    this._elementLikeBtn.addEventListener('click', this._toggleLike);
    // слушатель кнопки удаления
    this._elementDeleteBtn.addEventListener('click', this._handleDelete);
    // слушатель картинки
    this._elementImage.addEventListener('click', this._handleImageClick);
  }
}
