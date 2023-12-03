function showInputError(formEl,inputEl,{inputErrorClass,errorClass}){
const errorMessageEl= formEl.querySelector(`#${inputEl.id}-error`);
inputEl.classList.add(inputErrorClass);
errorMessageEl.textContent=inputEl.validationMessage;
errorMessageEl.classList.add(errorClass);
}
function hideInputError(formEl,inputEl,{inputErrorClass,errorClass}){
    const errorMessageEl= formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent="";
    errorMessageEl.classList.remove(errorClass);
}
function checkInputValidity(formEl,inputEl,options){
if(!inputEl.validity.valid){
    showInputError(formEl,inputEl,options);
}else{
   hideInputError(formEl,inputEl,options);
}
}
function toogleButtonState(inputEls,{submitButtonSelector,inactiveButtonClass}){
    const foundInvalid=false;
    inputEls.forEach(inputEl =>{
        if (!inputEl.validity.valid){
            foundInvalid=true;
        }
    });
    if (foundInvalid) {
        submitButtonSelector.classList.add(inactiveButtonClass);
        submitButtonSelector.disabled=true;
    }else{
        submitButtonSelector.classList.remove(inactiveButtonClass)
        submitButtonSelector.disabled=false;
    }
}

function setEventListeners(formEl, options) {
const { inputSelector} = options;
const {submitButtonSelector}=options;
const inputEls = [...formEl.querySelectorAll(inputSelector)];
inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input",(e) => {
        checkInputValidity(formEl, inputEl, options);
        toogleButtonState(inputEls,options);
    })
})

}

function enableValidation(options ){
const formEls=[...document.querySelectorAll(options.formSelector)];
formEls.forEach((formEl) => {
    formEl.addEventListener('submit',(e) => {
        e.preventDefault();
    });

    //look for all inputs inside of the form 
    //loop through all the inputs to see if all are valid 
    //if input is NOT valid - grab validation message
    // - add error class to input 
    //display error message 
    //disable button 
    // if all inputs are valid 
    //- enable button 
    //reset error messages 
    setEventListeners(formEl,options);
});
};
const config={
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: ".modal__button_disabled",
    inputErrorClass: ".modal__input_type_error",
    errorClass: ".modal__error_visible"
};


enableValidation(config);