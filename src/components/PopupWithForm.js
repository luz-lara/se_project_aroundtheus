import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popup.querySelector(".modal__form");
        this._formInputs = this._popupForm.querySelectorAll(".modal__input");
        this._submitButton = this._popupForm.querySelector(".modal__button")
        this._handleFormSubmit = handleFormSubmit;
        //this._defaultButtonText = this._submitButton
        //? this._submitButton.textContent
     //   : "";
     this._submitButtonText=this._submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._formInputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    renderLoading(isLoading,loadingText="Saving...") {
        if (isLoading) {
          this._submitButton.textContent =loadingText;
        }
        else{
            this._submitButton.textContent=this._submitButtonText;
        }
      }

    setEventListener() {
        super.setEventListeners();
        //submit event 
        this._popupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._popupForm.reset();
        });
    }
}