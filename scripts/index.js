// переменные профайла
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const editProfile = document.querySelector('.profile__edit');
// переменные попап
const popupTarget = document.querySelector('.popup');
const popupFormTarget = popupTarget.querySelector('.popup__form');
const closePopupBtn = popupTarget.querySelector('.popup__abort-button');
const saveInfoBtn = popupFormTarget.querySelector('.popup__save-button');
// инпуты попап
const inputName = popupFormTarget.querySelector('.popup__edit-info_field_name')
const inputDescription = popupFormTarget.querySelector('.popup__edit-info_field_description')

// переменные карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
let cardElement;

// Вставка карточек методом forEach
initialCards.forEach((num) => {
  cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = num.link;
  cardElement.querySelector('.element__image').alt = num.name;
  cardElement.querySelector('.element__text').textContent = num.name;
  elements.append(cardElement);
});


// функция открытия попапа
const handleEditButtonClick = function () {
  popupTarget.classList.add('popup_opened');
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

// функция закрытия попапа
const handleCloseButtonClick = function () {
  popupTarget.classList.remove('popup_opened');
}

// функиция сохранения информации
const saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  popupTarget.classList.remove('popup_opened');
}

// слушатели
editProfile.addEventListener('click', handleEditButtonClick);
closePopupBtn.addEventListener('click', handleCloseButtonClick);
popupFormTarget.addEventListener('submit', saveInfoButtonClick);
