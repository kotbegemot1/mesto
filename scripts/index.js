import { Card } from "./Card.js";
import { initialCards, validationConfig } from "./tools.js";
import { FormValidator } from "./FormValidator.js";

// переменные профайла
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-new');

// переменные попап
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

// хэндлер для закрытия кнопкой Esc
function handleBtnEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
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

function handleCardImageClick(link, title) {
  popupFigureImage.src = link;
  popupFigureImage.alt = title;
  popupFigureFigurcaption.textContent = title;
  openPopup(popupImgTarget);
}

initialCards.forEach((data) => {
  const card = new Card(data, '.card-template', handleCardImageClick);
  const cardElementS = card.generateCard();

  elements.append(cardElementS);
});

// функция заполнения редактирования профиля
const editButtonClick = function (evt) {
  // resetValidationErrors(popupFormEditProfile);
  editFormValidator.resetValidationFields();
  openPopup(popupEditProfile);
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

// функция закрытия попапов кнопкой крестиком
function closePopupByBtns(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__abort-button')) {
    const popupAbortBtn = evt.target.closest('.popup');
    closePopup(popupAbortBtn);
  }
}

// функция добавления новой карточки
const addCardBtnClick = function () {
  addCardFormValidator.resetValidationFields();
  openPopup(popupAddCard);
  inputTitle.value = '';
  inputUrl.value = '';
}

// функиция сохранения информации
const saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

// функиция добавления новой карточки
const saveNewCardButtonClick = function (evt) {
  evt.preventDefault();
  const data = {
    name: inputTitle.value,
    link: inputUrl.value
  }
  const card = new Card(data, '.card-template', handleCardImageClick);
  const cardElementS = card.generateCard();
  elements.prepend(cardElementS);
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

// валидация
const editFormValidator = new FormValidator(validationConfig, popupFormEditProfile);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, popupFormAddCard);
addCardFormValidator.enableValidation();
