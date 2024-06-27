import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    this._cardImage = this._popup.querySelector(".modal__preview-image");
  }
  open(name,link) {
    this._cardImage.src = link;
    //this._previewModalTitle.textContent = data.name;
    this._cardImage.alt = name;
    super.open();
  }
  setEventListeners(){
    super.setEventListeners();
  }
}
