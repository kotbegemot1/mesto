export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.handleEscCloseMediator = this._handleEscClose.bind(this);
  }
  // хендлер закрытие кнопкой ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  // открыть попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.handleEscCloseMediator)
  }
  // закрыть попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handleEscCloseMediator)
  }
  // хендлер закрытие по нажатию на оверлей или крестик
  _closePopupOverlayOrBtn = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__abort-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupOverlayOrBtn)
  }

}
