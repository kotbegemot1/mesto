import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input-info'));
    this._saveBtn = this._popupForm.querySelector('.popup__save-button');
  }

  // получить данные с инпутов
  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(element => {
      this._formValues[element.name] = element.value;
      // console.log(element.name, element.value);
    });
    return this._formValues
  }

  // запись в инпуты
  setInputValues = (data) => {
    const inputValues = Object.values(data);
    this._inputList.forEach((element,index) => {
      element.value = inputValues[index];
    });
  }

 // во время загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._bufferText = this._saveBtn.textContent;
      this._saveBtn.textContent = 'Сохранение...';
      // console.log('Сохранение...');
    } else {
      this._saveBtn.textContent = this._bufferText;
      // console.log('Сохранение...ОТмена');
    }
  }

  // назначение слушателей
  setEventListeners(){
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  // переопределение закрытия
  close(){
    this._popupForm.reset();
    super.close();
  }
}
