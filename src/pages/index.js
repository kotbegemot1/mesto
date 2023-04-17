import {
  apiConfig,
  validationConfig,
  editProfileBtn,
  addCardBtn,
  userObject,
  avatarUpdateBtn
} from '../utils/constants.js'

import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmDel from "../components/PopupWithConfirmDel.js";
import Api from "../components/Api.js";

import '../pages/index.css';

// api
const api = new Api(apiConfig);

// экземпляр пользователя
const user = new UserInfo(userObject);
let userId;

// объединение промисов, чтобы userId и initialCards загрузились одновременно
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // console.log(initialCards);
    userId = userInfo._id;
    user.setUserInfo(userInfo);
    user.updateAvatar(userInfo);
    cardsList.renderItems(initialCards, userId);
  })
  .catch(err => console.log(err))

// карточки при загрузке страницы
const cardsList = new Section(
  {
    renderer: (initialCards, userId) => {
      // console.log(initialCard);
      cardsList.addItem(createCard(initialCards, userId));
    }
  },
  '.elements'
)


// функция создания новой карточки
const createCard = (item, userId) => {
  const card = new Card(item, userId, '.card-template', handleCardImageClick, handleDeleteClick, handleAddlike, handleDeletelike)
  return card.generateCard();
}

const handleAddlike = (card, cardId) => {
  console.log(card, cardId);
  api.putLike(cardId)
    .then(res => card.updateLike(res))
    .catch(err => console.log(err))
}

const handleDeletelike = (card, cardId) => {
  console.log(card, cardId);
  api.deleteLike(cardId)
  .then(res => card.updateLike(res))
  .catch(err => console.log(err))
}

// хендлер для сабмита формы редактирования профиля
const handleEditFormSubmit = function (data) {
  popupEdit.renderLoading(true);
  // console.log({name: data.name, about: data.about});
  console.log(data);
  api.editUserInfo(data)
  .then(res => user.setUserInfo(res))
  .catch(err => console.log(err))
  .finally(() => popupEdit.renderLoading(false))

}

// экземпляры класса попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup_type_edit-profile', handleEditFormSubmit);
popupEdit.setEventListeners();

// хендлер для сабмита формы обновления аватара
const handleUpdateAvatarSubmit = function (inputData) {
  popupUpdateAvatar.renderLoading(true);
  api.updateUserAvatar(inputData)
  .then(avatar => user.updateAvatar(avatar))
  .catch(err => console.log(err))
  .finally(() => popupUpdateAvatar.renderLoading(false))
}

// экземпляры класса попапа обновления аватара
const popupUpdateAvatar = new PopupWithForm('.popup_type_avatar-update', handleUpdateAvatarSubmit);
popupUpdateAvatar.setEventListeners();

// экземпляры класса добавления карточки
const popupAdd = new PopupWithForm('.popup_type_add-card', (inputData) => {
  popupAdd.renderLoading(true);
  api.addNewCard({name: inputData.title, link: inputData.link})
    .then((res) => cardsList.addItem(createCard(res, userId)))
    .catch(err => console.log(err))
    .finally(() => popupAdd.renderLoading(false))
});
popupAdd.setEventListeners();

// экземпляр класса открытия карточки
const popupOpenImage = new PopupWithImage('.popup_type_image');
popupOpenImage.setEventListeners();

function handleCardImageClick(link, name) {
  popupOpenImage.open(link, name);
}

// экземпляр класса подтверждения удаления
const popupConfirmDel = new PopupWithConfirmDel('.popup_type_card-delete', handledeleteCard);
popupConfirmDel.setEventListeners();

// хендлер подтверждения удаления карточки
function handledeleteCard(element, cardId) {
  api.deleteCard(cardId);
  element.remove();
}

// хендлер при нажатии на корзину удаления карточки
function handleDeleteClick(element, cardId) {
  // console.log(element);
  popupConfirmDel.open(element, cardId);
}

// функция заполнения редактирования профиля
const editButtonClick = function () {
  popupEdit.setInputValues(user.getUserInfo());
  formValidators['profile-form'].resetValidationFields();
  popupEdit.open();
}

const updateButtonClick = function() {
  // console.log('hello, from update');
  formValidators['avatar-update'].resetValidationFields();
  popupUpdateAvatar.open();
}

// функция добавления новой карточки
const addCardBtnClick = function () {
  formValidators['card-form'].resetValidationFields();
  popupAdd.open();
}

// слушатели
// изменение профайла
editProfileBtn.addEventListener('click', editButtonClick);

// обновление аватара
avatarUpdateBtn.addEventListener('click', updateButtonClick)

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
