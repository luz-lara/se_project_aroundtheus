export default class Popup {
    constructor({popupSelector}) {
        this._popup =document.querySelector(popupSelector); 
        this._closeButton=this._popup.querySelector(".modal__close-button");
    }
  
    
    open(){
        this._popup.classList.add("modal_opened");
        document.addEventListener("keydown",this._handleEscClose);
    };
    close(){
        this._popup.classList.remove("modal_opened");
    }
    _handleEscClose=(e) => {
        if (e.key === "Escape" || e.key === "Esc") {
            this.close();
        }
    };

        setEventListeners() {
            // Close the popup when users click on the shaded area outside the modal
            this._popup.addEventListener("click", (event) => {
              if (event.target === event.currentTarget) {
                this.close();
              }
            });
        
            this._closeButton.addEventListener("click", () => this.close());
          }
        }
    
