function setEventListeners(formElement,options){

}

function enableValidation(options ){
const formEls=[...document.querySelectorAll(options.formSelector)];
formEls.forEach((formEls) => {
    formEls.addEventListener('submit',(e) => {
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
});
};
const config={
    formSelector: ".modal__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}


enableValidation(config);