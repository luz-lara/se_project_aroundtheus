export default class Popup {
    constructor(popupSelector) {
        this._popup =document.querySelector(popupSelector); 
        this._closeBtn=this._popup.querySelector(".modal__close-button");
    }
    _handleEscClose(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            this.close();
        }
    }
    open(){
        this._popup.classList.add("modal_opened");
        document.addEventListener("keydown",this._handleEscClose);
    }
    close(){
        this._popup.classList.remove("modal_opened");
    }
    setEventListeners(){
        this._closeBtn.addEventListener("click",()=> {
            this.close();
        });
       this._popup.addEventListener("mousedown",(e)=>{
        if (e.target === this._popup){
            this.close();
        }
       });
    }
}
