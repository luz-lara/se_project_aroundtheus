import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,handleFormSubmit) {
        super({popupSelector});
        this._popupForm=this._popup.querySelector(".modal__form");
        this._handleFormSubmit=handleFormSubmit;
        this._formInputs=this._popupForm.querySelectorAll(".modal__input");
    }
 
    _getInputValues(){
        const inputObject={};
        this._formInputs.forEach((input)=>{
            inputObject[input.name]=input.value;
        });
        return inputObject;
    }
    setEventListener(){
        super.setEventListeners();
        //submit event 
        this._popupForm.addEventListener("submit",(event)=>{
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._popupForm.reset();
        });
    }
}