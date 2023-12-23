export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }
    _checkInputValidity(inputEl){
        if(!inputEl.validity.valid){
            this._showInputError(inputEl);
        }else{
            this._hideInputError(inputEl);
        }
    }
    _showInputError(inputEl){
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._config.inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._config.errorClass);
       ;
    }
    _hideInputError(inputEl){
        const errorMessageEl =this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._config.inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._config.errorClass);
    }
    _setEventListeners() {
        this._input = [...this._form.querySelectorAll(this._config.inputSelector)];
        this._input.forEach((inputEl) => {
            inputEl.addEventListener("input", () => { 
                this._checkInputValidity(inputEl);
             }

            )
        }
        )
    }
   
    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        }
        )
        this._setEventListeners();
    }

}



