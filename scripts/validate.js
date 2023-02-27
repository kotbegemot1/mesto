// функция показа красной рамки при ошибке
const showInputError = (formElement, formInput, errorMessage, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);

};

// функция скрытие красной рамки при отсутствии ошибки
const hideInputError = (formElement, formInput, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

// функция определяющая показать или скрыть рамку об ошибке
const isValid = (formElement, formInput, inputErrorClass, errorClass) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, formInput, inputErrorClass, errorClass);
  }
};

// функция проверяющая каждое поле
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

// функция активации/деактивации кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция для активации валидации
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-info_type_error',
  errorClass: 'popup__error_visible',
});
