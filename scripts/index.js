// переменные профайла
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-new');

// переменные попап
const closeEditProfileBtns = document.querySelectorAll('.popup__abort-button');

// переменные попап открытие изображения
const popupImgTarget = document.querySelector('.popup-figure');

// переменные попап редактирование профиля
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
// инпуты попап редактирование профиля
const inputName = popupFormEditProfile.querySelector('.popup__input-info_field_name')
const inputDescription = popupFormEditProfile.querySelector('.popup__input-info_field_description')

// переменные попап добавления карточек
const popupFormAddCard = document.querySelector('.popup__form_type_add-card');
// инпуты попап добавления карточек
const inputTitle = popupFormAddCard.querySelector('.popup__input-info_field_title')
const inputUrl = popupFormAddCard.querySelector('.popup__input-info_field_url')

// переменные карточек
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

// функция окрытие попапа
function openPopup(popup) {
  const popupTarget = popup.closest('.popup');
  popupTarget.classList.add('popup_opened');
}
// функция закрытия попапа
function closePopup() {
  const popupTarget = this.elem.closest('.popup');
  popupTarget.classList.remove('popup_opened');
}

// функция добавления карточек в html
function addCardToHTML(title, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementToDel = cardElement.querySelector('.element');

  const likeBtn = cardElement.querySelector('.element__like');
  const deleteBtn = cardElement.querySelector('.element__delete');
  const cardImage = cardElement.querySelector('.element__image');

  const popupFigureImage = popupImgTarget.querySelector('.popup-figure__image');
  const popupFigureFigurcaption = popupImgTarget.querySelector('.popup-figure__figurecaption');

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

  deleteBtn.addEventListener('click', () => elementToDel.remove()); // не получается сделать через cardElement.remove(),
                                                                    // потому что у меня cardElement это document-fragment
  return cardElement
}

// Вставка карточек методом forEach
initialCards.forEach((num) => {
  elements.append(addCardToHTML(num.name, num.link));
});

// функция заполнения редактирования профиля
const editButtonClick = function () {
  openPopup(popupFormEditProfile);
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
}

// функция добавления новой карточки
const addCardBtnClick = function () {
  openPopup(popupFormAddCard);
  inputTitle.value = '';
  inputUrl.value = '';
}

// функиция сохранения информации
const saveInfoButtonClick = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  descriptionProfile.textContent = inputDescription.value;
  closePopup(elem=popupFormEditProfile);
}

// функиция добавления новой карточки
const saveNewCardButtonClick = function (evt) {
  evt.preventDefault();
  const title = inputTitle.value;
  const url = inputUrl.value;
  elements.prepend(addCardToHTML(title, url));
  closePopup(elem=popupFormAddCard);
}

// слушатели
// изменение профайла
editProfileBtn.addEventListener('click', editButtonClick);
popupFormEditProfile.addEventListener('submit', saveInfoButtonClick);

// добавление карточек
addCardBtn.addEventListener('click', addCardBtnClick);
popupFormAddCard.addEventListener('submit', saveNewCardButtonClick);

// закрытие карточек
closeEditProfileBtns.forEach( popup => popup.addEventListener('click', {handleEvent: closePopup, elem: popup}));
