import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input-info'));
  }

  // получить данные с инпутов
  _getInputValues() {
    // this._inputList = this._popup.querySelectorAll('.popup__input-info')

    this._formValues = {}

    this._inputList.forEach(element => {
      this._formValues[element.name] = element.value;
    });
    // console.log(this._formValues);
    return this._formValues
  }

  // запись в инпуты
  setInputValues = (data) => {
    // console.log(typeof(data));
    // console.log(typeof(Object.values(data)));
    const inputValues = Object.values(data);
    this._inputList.forEach((element,index) => {
      // console.log(`${element.value} + ${index}`);
      element.value = inputValues[index];
    });
  }

  // назначение слушателей
  setEventListeners(){
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._getInputValues());
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  // переопределение закрытия
  close(){
    this._popupForm.reset();
    super.close();
  }
}
