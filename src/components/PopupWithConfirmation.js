import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popup.querySelector(".modal__delete-form");
        this._submitButton = this._popupForm.querySelector(".modal__delete-button")
        this._defaultButtonText = this._submitButton
        ? this._submitButton.textContent
        : "";
        this._handleFormSubmit = handleFormSubmit;
        this._deleteCardForm = document.forms["delete-card-form"];
    }

    setEventListener() {
        super.setEventListeners();
           this._popup.addEventListener("submit",(e)=>{
            e.preventDefault();
            const cardId=this._popupForm.dataset.cardId;
            const cardElement = document.getElementById(cardId)
             this._handleFormSubmit(cardId,cardElement);
          })
        }
      
      open(cardId) {
        console.log(`Opening delete confirmation for cardId=${cardId}`);
        this._popupForm.dataset.cardId = cardId;
        console.log(cardId);
        super.open();
      }
      setLoadingState(isLoading) {
        if (this._submitButton) {
          this._submitButton.textContent = isLoading
          ? "Deleting..."
          : this._defaultButtonText;
        }
      }
    
}

