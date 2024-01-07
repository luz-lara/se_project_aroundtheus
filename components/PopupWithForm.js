import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,handleFormSubmit) {
        super({popupSelector});
        this._popupForm=this._popup.querySelector(".modal__form");
        this._handleFormSubmit=handleFormSubmit;
    }
    close(){
        console.log("listening");
    }
}