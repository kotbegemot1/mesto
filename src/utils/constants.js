// переменные
export const profileEditBtn = document.querySelector('.profile__edit');
export const cardAddBtn = document.querySelector('.profile__add-new');
export const avatarUpdateBtn = document.querySelector('.profile__avatar');

// заготовка UserInfo
export const userObject = {
  selectorName: '.profile__name',
  selectorAbout: '.profile__about',
  selectorAvatar: '.profile__avatar'
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-info_type_error',
  errorClass: 'popup__error_visible',
};

export const apiConfig = {
  groupUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  token: '265972f8-d6f6-47e5-8389-cd6411096f33'
}


// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];
