export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector,
    this._inputSelector = data.inputSelector,
    this._submitButtonSelector = data.submitButtonSelector,
    this._inactiveButtonClass = data.inactiveButtonClass,
    this._inputErrorClass = data.inputErrorClass,
    this._errorClass = data.errorClass,

    this._formElement = formElement,
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)),
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)

  }

   // показать ошибки
  _showInputError(formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);

    formInput.classList.add(this._inputErrorClass);
    formError.textContent = formInput.validationMessage;
    formError.classList.add(this._errorClass);
  };

  // скрыть ошибки
  _hideInputError(formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);

    formInput.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  };

  // валидация полей
  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  }

  // активировать кнопку
  _disableBtn() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  // дезактивировать кнопку
  _activateBtn() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput(){
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableBtn();
    } else {
      this._activateBtn();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
      this._isValid(formInput);
      this._toggleButtonState();
    })
  })
  }

  // сбросить ошибки и дезактивировать кнопку
  resetValidationFields(){
    this._disableBtn();
    this._inputList.forEach((input) => {this._hideInputError(input)});
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
