import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCards, config } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

/*                                                                          */
/*                                PROFILE CONSTANTS                         */
/*                                                                          */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");
const profileModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector(".modal__input-name");
const profileDescriptionInput = document.querySelector(
  ".modal__input-description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["profile-form"];
const closeEditButton = profileModal.querySelector(".modal__close-button");

/*                                                                          */
/*                                ADD CARD CONSTANTS                        */
/*                                                                          */
const addCardModal = document.querySelector("#profile-add-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const cardListEl = document.querySelector(".gallery__list");


/*                                                                          */
/*                                PREVIEW CARD MODAL                        */
/*                                                                          */
const previewModalTitle = document.querySelector(".modal__preview-title");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageModal = document.querySelector("#preview-image-modal");
const cardTitle = addCardModal.querySelector(".modal__input-title");
const cardLink = addCardModal.querySelector(".modal__input-url");
const addCardForm = document.forms["add-card-form"];
const closeButtons = document.querySelectorAll(".modal__close-button");
const cardImagePopup = new PopupWithImage("#preview-image-modal");
cardImagePopup.setEventListeners();


/*                                                                          */
/*                             FUNCTIONS                                    */

function handleFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.link;
  renderCard({ name, link });
  addCardPopup.close();
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

function createCard(cardData) {
  const cardElements = new Card(cardData, "#card-template", () => {
    cardImagePopup.open(cardData);
  });
  return cardElements.viewCard();
}

function renderCard(cardData) {
  const newCard = createCard(cardData);
  cardListEl.prepend(newCard);
}


/*                                                                          */
/*                                EVENT LISTENERS                           */
/*                                                                          */

/*-------------------------------PROFILE ----------------------------------*/
/*profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});*/
profileEditButton.addEventListener("click",()=>{
  const {title,job} = profileInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value=job;
  profileEditPopup.open();
})


profileAddButton.addEventListener("click", () => {

  addCardPopup.open();
});
//profileForm.addEventListener("submit", (e) => {
 // e.preventDefault();
  //handleProfileEditSubmit();

 // profileTitle.textContent = profileTitleInput.value;
 // profileDescription.textContent = profileDescriptionInput.value;
  //closePopup(profileModal);
 // profileEditPopup.close();
  
 // profileForm.reset();
 // profileFormValidator.toggleButtonState();
//});
const profileEditPopup = new PopupWithForm(
  {
  popupSelector:"#profile-edit-modal", 
  handleFormSubmit:({title,description})=>{
    profileInfo.setUserInfo(title,description);
  profileEditPopup.close();
  }
});
profileEditPopup.setEventListener();

//function handleProfileEditSubmit ({name,description}){
//profileInfo.setUserInfo(name,description);

//profileEditPopup.close();
//}
/*---------------------------USER INFO---------------------------------*/
const profileInfo=new UserInfo(".profile__title",".profile__description");

/*----------------------------CARD---------------------------------------*/
const addCardPopup = new PopupWithForm({
  popupSelector:"#profile-add-modal", 
  handleFormSubmit:handleFormSubmit,
})
addCardPopup.setEventListener();
//addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileAddButton.addEventListener("click",()=>{
  addCardPopup.open();
})
/*------------------------- Section-------------------------- */
const defaultCardList = new Section({
  items: initialCards,
  renderer:renderCard,
},
".gallery__list");


/*                                                                          */
/*                                FORM VALIDATORS                           */
/*                                                                          */

const profileFormValidator = new FormValidator(config, profileModal);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardModal);
addCardFormValidator.enableValidation();

defaultCardList.renderItems();