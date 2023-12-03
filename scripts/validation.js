function showInputError(formEl,inputEl,options){
//enable the span error to show 
const errorMessageEl= formEl.querySelector(`#${inputEl.id}-error`)
console.log(errorMessageEl);
}

function checkInputValidity(formEl,inputEl,options){
if(!inputEl.validity.valid){
    showInputError(formEl,inputEl,options);
}else{
    hideInputError(formEl,inputEl,options);
}
}





function setEventListeners(formEl,options) {
const {inputSelector}= options;
const inputEls=[...formEl.querySelectorAll(inputSelector)];
inputEls.forEach((inputEl) => {
 inputEl.addEventListener("input",(e)=>{
 console.log(inputEl.validationMessage);
    });
    
};


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
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};


enableValidation(config);