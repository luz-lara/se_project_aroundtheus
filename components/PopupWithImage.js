import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
    super(popupSelector);
    }
    open(data) {
        this._previewModalTitle = document.querySelector(".modal__preview-title");
        this._previewImage = document.querySelector(".modal__preview-image");
        this._previewImage.src = data.link;
        this._previewModalTitle.textContent = data.name;
        this._previewImage.alt = data.name;
        super.open();
    }
}