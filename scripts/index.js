// переменные профайла
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');
let editProfile = document.querySelector('.profile__edit');
// переменные попап
let popupTarget = document.querySelector('.popup');
let popupFormTarget = popupTarget.querySelector('.popup__form');
let closePopupBtn = popupFormTarget.querySelector('.popup__abort-button');
let saveInfoBtn = popupFormTarget.querySelector('.popup__save-button');
// инпуты попап
let inputName = popupFormTarget.querySelector('.popup__edit-info_field_name')
let inputDescription = popupFormTarget.querySelector('.popup__edit-info_field_description')

// функция открытия попапа
let handleEditButtonClick = function () {
  popupTarget.classList.add('popup_opened');
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

// функция закрытия попапа
let handleCloseButtonClick = function () {
  popupTarget.classList.remove('popup_opened');
}

// функиция сохранения информации
let saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  popupTarget.classList.remove('popup_opened');
}

// слушатели
editProfile.addEventListener('click', handleEditButtonClick);
closePopupBtn.addEventListener('click', handleCloseButtonClick);
popupFormTarget.addEventListener('submit', saveInfoButtonClick);
