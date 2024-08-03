import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    this._cardImage = this._popup.querySelector(".modal__preview-image");
    this._cardImageTitle=this._popup.querySelector(".modal__preview-title");
  }
  open(cardData) {
   this._cardImage.src=cardData.link;
   this._cardImage.alt=cardData.name
   this._cardImageTitle.textContent=cardData.name;
    super.open();

  }
  
}
