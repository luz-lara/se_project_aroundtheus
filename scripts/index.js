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

const profileEditButton =document.querySelector(".profile__edit-button");
const profileDescription=document.querySelector(".profile__description");
const profileTitle =document.querySelector(".profile__title");
const profileModal= document.querySelector("#profile-edit-modal");
const profileTitleInput=document.querySelector(".modal__input-name");
const profileDescriptionInput=document.querySelector(".modal__input-description");
const closeEditButton=profileModal.querySelector(".modal__close-button");
const profileForm = profileModal.querySelector(".modal__form");
const cardListEl=document.querySelector(".gallery__list");
const cardTemplate= document.querySelector("#card-template").content.firstElementChild;

profileEditButton.addEventListener('click', function(){
  profileTitleInput.value=profileTitle.textContent;
  profileDescriptionInput.value=profileDescription.textContent;
  profileModal.classList.add("modal__opened");
 
}
);
function closePopup(){
  profileModal.classList.remove("modal__opened");
};

closeEditButton.addEventListener("click",()=> {
  closePopup();
})
profileForm.addEventListener("submit",(e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  console.log("its working");
  closePopup();
}
);
function getCardElement (cardData){
  const cardElement= cardTemplate.cloneNode(true);
  //accessing the card title
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImageEl= cardElement.querySelector(".card__image");
  //setting the card tittle to the name field.
  cardTitle.textContent =cardData.name;
  //setting the card image
  cardImageEl.src= cardData.link;
  //setting the image alt 
  cardImageEl.alt= cardData.name;
  return cardElement;
}


initialCards.forEach((cardData) =>{
const cardElement= getCardElement(cardData);
cardListEl.append(cardElement);
});
 