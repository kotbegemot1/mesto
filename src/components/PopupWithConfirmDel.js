import Popup from "./Popup.js";

export default class PopupWithConfirmDel extends Popup {
  constructor(popupSelector, handledeleteCard) {
    super(popupSelector);
    this._handledeleteCard = handledeleteCard;
    this._popupSubmitBtn = this._popup.querySelector('.popup__save-button');
    // console.log(this._handledeleteCard);


  }
  open(element, cardId) {
    super.open()
    this._element = element;
    this._cardId = cardId;
    // console.log(this._cardId);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSubmitBtn.addEventListener('click', (evt) => {

      this._handledeleteCard(this._element, this._cardId);
      this.close();
    })
  }
}
