import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,handleFormSubmit) {
        super({popupSelector});
        this._popupForm=this._popup.querySelector(".modal__form");
        this._handleFormSubmit=handleFormSubmit;
        this._inputList=[...this._popupForm.querySelectorAll(".modal__input")];
    }
    close(){
        super.close();
        this.popupForm.reset();
        console.log("listening");
    }
    _getInputValues(){
        const data={};
        this._inputList.forEach((inputElement)=>{
            data[inputElement.name]=inputElement.value;
        });
        return data;
    }
    setEventListener(){
        this._popupForm.addEventListener("submit",()=>{
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }
}