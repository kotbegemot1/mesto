// переменные профайла
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-new');

// переменные попап
const closeEditProfileBtns = document.querySelectorAll('.popup__abort-button');
console.log(closeEditProfileBtns);

// переменные попап редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileBtn = popupEditProfile.querySelector('.popup__abort-button');
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
const popupImgTarget = document.querySelector('.popup_type_image')
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
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

// функция добавления карточек в html
function addCardToHTML(title, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeBtn = cardElement.querySelector('.element__like');
  const deleteBtn = cardElement.querySelector('.element__delete');
  const cardImage = cardElement.querySelector('.element__image');

  cardImage.src = link;
  cardImage.alt = title;
  cardElement.querySelector('.element__text').textContent = title;

  cardImage.addEventListener('click', (evt) => {
    popupImgTarget.querySelector('.popup-figure__image').src = link;
    popupImgTarget.querySelector('.popup-figure__image').alt = title;
    popupImgTarget.querySelector('.popup-figure__figurecaption').textContent = title;
    popupImgTarget.classList.add('popup_opened');
  });

  likeBtn.addEventListener('click', evt => evt.target.classList.toggle('element__like_active'));
  deleteBtn.addEventListener('click', evt => {
    console.log(evt);
    const targetBtn = evt.target.closest('.element');
    targetBtn.remove('element');
  });

  elements.append(cardElement);
}

// Вставка карточек методом forEach
initialCards.forEach((num) => {
  addCardToHTML(num.name, num.link);
});

// функция открытия попапа редактирования профиля
const editButtonClick = function () {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

// функция открытия попапа добавления карточки
const addCardBtnClick = function () {
  popupAddCard.classList.add('popup_opened');
  inputTitle.value = '';
  inputUrl.value = '';
}

// функция закрытия попапа
function closePopup(evt) {
  const popupTarget = evt.target.closest('.popup');
  popupTarget.classList.remove('popup_opened');
}

// функиция сохранения информации
const saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  popupEditProfile.classList.remove('popup_opened');
}

// функиция добавления новой карточки
const saveNewCardButtonClick = function (evt) {
  evt.preventDefault();
  const title = inputTitle.value;
  const url = inputUrl.value;
  addCardToHTML(title, url);
  popupAddCard.classList.remove('popup_opened');
}

// слушатели
// изменение профайла
editProfileBtn.addEventListener('click', editButtonClick);
popupFormEditProfile.addEventListener('submit', saveInfoButtonClick);

// добавление карточек
addCardBtn.addEventListener('click', addCardBtnClick);
popupFormAddCard.addEventListener('submit', saveNewCardButtonClick);

// удаление карочек
closeEditProfileBtns.forEach( popup => popup.addEventListener('click', closePopup));
