import {
  initialCards,
  validationConfig,
  editProfileBtn,
  addCardBtn,
  userObject
} from '../utils/constants.js'

import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import '../pages/index.css';

// экземпляр пользователя
const user = new UserInfo(userObject);
user.setUserInfo({});

// функция создания новой карточки
const createCard = (data) => {
  const dataValues = Object.values(data);
  const card = new Card(dataValues, '.card-template', handleCardImageClick)
  return card.generateCard();
}

// карточки при загрузке страницы
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (initialCard) => {
      cardsList.addItem(createCard(initialCard));
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
const popupAdd = new PopupWithForm('.popup_type_add-card', ({title, link}) => {
  cardsList.addItem(createCard({title, link}));
});
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
