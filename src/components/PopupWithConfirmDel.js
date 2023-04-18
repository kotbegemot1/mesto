import Popup from "./Popup.js";

export default class PopupWithConfirmDel extends Popup {
  constructor(popupSelector, handledeleteItem) {
    super(popupSelector);
    this._handledeleteItem = handledeleteItem;
    this._popupSubmitBtn = this._popup.querySelector('.popup__save-button');
    // console.log(this._handledeleteItem);


  }
  open(element, item) {
    super.open()
    this._element = element;
    this._item = item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSubmitBtn.addEventListener('click', (evt) => {

      this._handledeleteItem(this._element, this._item);
      this.close();
    })
  }
}
