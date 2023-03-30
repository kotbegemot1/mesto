import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this.popupFigureImage = this._popup.querySelector('.popup-figure__image');
    this.popupFigureFigurcaption = this._popup.querySelector('.popup-figure__figurecaption');
  }
  // переопределение метода open: вставка картинки с изображением в попап
  open(link, title) {
    super.open();
    this.popupFigureImage.src = link;
    this.popupFigureImage.alt = title;
    this.popupFigureFigurcaption.textContent = title;
  }
}
