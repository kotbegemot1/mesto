// переменные профайла
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-new');

// переменные попап
const abortButtons = document.querySelectorAll('.popup__abort-button');
const popups = document.querySelectorAll('.popup');

// переменные попап открытие изображения
const popupImgTarget = document.querySelector('.popup_type_image');
const popupFigureImage = popupImgTarget.querySelector('.popup-figure__image');
const popupFigureFigurcaption = popupImgTarget.querySelector('.popup-figure__figurecaption');

// переменные попап редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
// инпуты попап редактирование профиля
const inputName = popupFormEditProfile.querySelector('.popup__input-info_field_name')
const inputDescription = popupFormEditProfile.querySelector('.popup__input-info_field_description')

// переменные попап добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
// инпуты попап добавления карточек
const inputTitle = popupFormAddCard.querySelector('.popup__input-info_field_title')
const inputUrl = popupFormAddCard.querySelector('.popup__input-info_field_url')

// переменные карточек
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

// хэндлер для закрытия кнопкой Esc
function handleBtnEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
  // console.log(evt.key);
}

// функция окрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleBtnEsc)
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleBtnEsc)
}

// функция добавления карточек в html
function addCardToHTML(title, link) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.element');
  // я не знаю, в этом месте правильно ли я понял, что вы имели ввиду

  const likeBtn = cardElement.querySelector('.element__like');
  const deleteBtn = cardElement.querySelector('.element__delete');
  const cardImage = cardElement.querySelector('.element__image');

  cardImage.src = link;
  cardImage.alt = title;
  cardElement.querySelector('.element__text').textContent = title;

  cardImage.addEventListener('click', () => {
    popupFigureImage.src = link;
    popupFigureImage.alt = title;
    popupFigureFigurcaption.textContent = title;
    openPopup(popupImgTarget);
  });

  likeBtn.addEventListener('click', evt => evt.target.classList.toggle('element__like_active'));

  deleteBtn.addEventListener('click', () => cardElement.remove());

  return cardElement
}

// Вставка карточек методом forEach
initialCards.forEach((num) => {
  elements.append(addCardToHTML(num.name, num.link));
});

// функция заполнения редактирования профиля
const editButtonClick = function (evt) {
  resetValidationErrors(popupFormEditProfile);
  openPopup(popupEditProfile);
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

const resetValidationErrors = (form) => {
  form.querySelectorAll('.popup__input-info_type_error').forEach(item => item.classList.remove('popup__input-info_type_error'));
  form.querySelectorAll('.popup__error_visible').forEach(item => item.classList.remove('popup__error_visible'));
}

// функция закрытия попапов кнопкой крестиком
function closePopupByBtns(evt) {
  console.log(evt.currentTarget.querySelector('.popup__form'));
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__abort-button')) {
    const popupAbortBtn = evt.target.closest('.popup');
    closePopup(popupAbortBtn);
  }

}

// функция добавления новой карточки
const addCardBtnClick = function () {
  resetValidationErrors(popupFormAddCard);
  openPopup(popupAddCard);
  inputTitle.value = '';
  inputUrl.value = '';
}

// функиция сохранения информации
const saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  const saveBtn = evt.target.querySelector('.popup__save-button');
  disabledBtn(saveBtn, 'popup__save-button_disabled');
  closePopup(popupEditProfile);
}

// функиция добавления новой карточки
const saveNewCardButtonClick = function (evt) {
  console.log(evt.target);
  evt.preventDefault();
  const title = inputTitle.value;
  const url = inputUrl.value;
  elements.prepend(addCardToHTML(title, url));
  const saveBtn = evt.target.querySelector('.popup__save-button');
  disabledBtn(saveBtn, 'popup__save-button_disabled');
  closePopup(popupAddCard);
}

// слушатели
// изменение профайла
editProfileBtn.addEventListener('click', editButtonClick);
popupFormEditProfile.addEventListener('submit', saveInfoButtonClick);

// добавление карточек
addCardBtn.addEventListener('click', addCardBtnClick);
popupFormAddCard.addEventListener('submit', saveNewCardButtonClick);

// закрытие карточек
popups.forEach(popup => popup.addEventListener('click', closePopupByBtns));
