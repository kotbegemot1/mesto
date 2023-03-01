// функция показа красной рамки при ошибке
const showInputError = (formInput, rest) => {
  const formError = rest[0].querySelector(`.${formInput.id}-error`);

  formInput.classList.add(rest[1]);
  formError.textContent = formInput.validationMessage;
  formError.classList.add(rest[2]);

};

// функция скрытие красной рамки при отсутствии ошибки
const hideInputError = (formInput, rest) => {
  const formError = rest[0].querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(rest[1]);
  formError.classList.remove(rest[2]);
  formError.textContent = '';
};

// функция определяющая показать или скрыть рамку об ошибке
const isValid = (formInput, ...rest) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, rest);
  } else {
    hideInputError(formInput, rest);
  }
};

// функция проверяющая каждое поле
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

const disabledBtn = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

// функция активации/деактивации кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disabledBtn(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;

  }
}

const setEventListeners = (formElement, rest) => {
  // console.log(rest);
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest.inactiveButtonClass);

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formInput, formElement, rest.inputErrorClass, rest.errorClass);
      toggleButtonState(inputList, buttonElement, rest.inactiveButtonClass);
    });
  });
};

// функция для активации валидации
const enableValidation = ({formSelector, ...rest}) => {
  // console.log(rest.formSelector);
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
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
