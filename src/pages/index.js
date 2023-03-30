import { initialCards, validationConfig } from "../utils/tools.js";

import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import '../pages/index.css';

// переменные
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-new');

// заготовка UserInfo
const userObject = {
  selectorName: '.profile__name',
  selectorDescription: '.profile__description'
}

// экземпляр пользователя
const user = new UserInfo(userObject);
user.setUserInfo({});

// функция создания новой карточки
const createCard = (data) => {
  const dataValues = Object.values(data);
  const card = new Card(dataValues, '.card-template', handleCardImageClick)
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// карточки при загрузке страницы
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (initialCard) => {
      createCard(initialCard);
    }
  },
  '.elements'
)
cardsList.renderItems();

// попапы

// хендлер для сабмита формы редактирования профиля
const handleEditFormSubmit = function (data) {
  user.setUserInfo(data)
}

// экземпляры класса попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup_type_edit-profile', handleEditFormSubmit);
popupEdit.setEventListeners();

// экземпляры класса добавления карточки
const popupAdd = new PopupWithForm('.popup_type_add-card', createCard);
popupAdd.setEventListeners();

// экземпляр класса открытия карточки
const popupOpenImage = new PopupWithImage('.popup_type_image');
popupOpenImage.setEventListeners();

function handleCardImageClick(link, title) {
  popupOpenImage.open(link, title);
}

// функция заполнения редактирования профиля
const editButtonClick = function () {
  popupEdit.setInputValues(user.getUserInfo());
  formValidators['profile-form'].resetValidationFields();
  popupEdit.open();
}

// функция добавления новой карточки
const addCardBtnClick = function () {
  formValidators['card-form'].resetValidationFields();
  popupAdd.open();
}

// слушатели
// изменение профайла
editProfileBtn.addEventListener('click', editButtonClick);

// добавление карточек
addCardBtn.addEventListener('click', addCardBtnClick);

// валидация
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)

    const formName = formElement.getAttribute('name')


    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);
