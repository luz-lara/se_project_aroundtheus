const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
let editButton =document.querySelector(".profile__edit-button");
let modalOpen = document.querySelector(".modal");
let closeButton = document.querySelector(".modal__close-button");
let inputName= document.querySelector(".form__input-name");
let inputDescription=document.querySelector(".form__input-description");
let profileName= document.querySelector(".profile__title");
let profileDescription= document.querySelector(".profile__description");

editButton.addEventListener("click", function(){
  modalOpen.classList.add("modal__open");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
 
});
console.log(modalOpen.classlist);
closeButton.addEventListener("click", function(){
  modalOpen.classList.remove("modal__open");
});
