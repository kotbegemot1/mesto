// кнопки для окна попап
let popupTarget = document.querySelector(".popup");
let editProfile = document.querySelector(".profile__edit");
let closePopupBtn = popupTarget.querySelector(".popup__abort-button");
let saveInfoBtn = popupTarget.querySelector(".popup__save-button");

// кнопка лайков
let likeActiveButtons = document.querySelectorAll(".element__like");

// инпуты
let inputs = document.querySelectorAll(".popup__edit-info")

// имя и описание профайла
let nameProfile = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__description");

let togglePopup = function () {
  popupTarget.classList.toggle("popup_open");
}

// функции открытия и закрытия попапа
let handleEditButtonClick = function () {
  inputs[0].value = nameProfile.textContent;
  inputs[1].value = descriptionProfile.textContent;
  togglePopup();
}

let handleCloseButtonClick = function () {
  togglePopup();
  setTimeout(checkBlankLine, 1000);
}

let handleOverlayClick = function (event) {
  if(event.target === event.currentTarget){
    togglePopup();
    setTimeout(checkBlankLine, 1000);
  }
}

// функиця сохранения информации
let saveInfoButtonClick = function () {
  nameProfile.textContent = inputs[0].value;
  descriptionProfile.textContent = inputs[1].value;
  togglePopup();
  setTimeout(checkBlankLine, 1000);
}

// функиция проверки на пустую строку вода информации
function checkBlankLine() {
  if (nameProfile.textContent == false || descriptionProfile.textContent == false) {
    alert("Вы ничего не ввели, в одно из полей.\nЗаполните строки ввода.");
    togglePopup();
  }
}

// слушатели для попапа
editProfile.addEventListener('click', handleEditButtonClick);
closePopupBtn.addEventListener('click', handleCloseButtonClick);
popupTarget.addEventListener('click', handleOverlayClick);
saveInfoBtn.addEventListener('click', saveInfoButtonClick);

// добавляет активацию лайков
for (let i = 0; i < likeActiveButtons.length; i++) {
  likeActiveButtons[i].addEventListener('click', function() {
    likeActiveButtons[i].classList.toggle("button_active");
  });
}
