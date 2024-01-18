export default class Popup {
    constructor(popupSelector) {
        this._popup =document.querySelector(popupSelector); 
    }
    _handleEscClose(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closePopup(this._popup);
        }
    }
    open(){
        this._popup.classList.add("modal_opened");
    }
    close(){
        this._popup.classList.remove("modal_opened");
    }
    setEventListeners(){
        this._closebuttons=document.querySelectorAll(".modal__close-button");
        this._closebuttons.forEach((button) => {
            const popup = button.closest(popupSelector);
            button.addEventListener("click", () => {
              close(popup);

            });
          });
    }
}
