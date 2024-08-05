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
const profileTitleInput = document.querySelector(".modal__input-name");
const profileDescriptionInput = document.querySelector(
  ".modal__input-description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["profile-form"];
/*                                                                          */
/*                                ADD CARD CONSTANTS                        */
/*                                                                          */
const addCardForm = document.forms["add-card-form"];


/*                                                                          */
/*                                PREVIEW CARD MODAL                        */
/*                                                                          */

const cardImagePopup = new PopupWithImage("#preview-image-modal");
cardImagePopup.setEventListeners();


/*                                                                          */
/*                             FUNCTIONS                                    */

function handleCardFormSubmit(inputValues) {
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
  cardSection.addItem(newCard);
}


/*                                                                          */
/*                                EVENT LISTENERS                           */
/*                                                                          */

/*-------------------------------PROFILE ----------------------------------*/
profileEditButton.addEventListener("click", () => {
  const { title, job } = profileInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = job;
  profileEditPopup.open();
})


profileAddButton.addEventListener("click", () => {

  addCardPopup.open();
});

const profileEditPopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
    handleFormSubmit: ({ title, description }) => {
      profileInfo.setUserInfo(title, description);
      profileEditPopup.close();
    }
  });
profileEditPopup.setEventListener();

/*---------------------------USER INFO---------------------------------*/
const profileInfo = new UserInfo(".profile__title", ".profile__description");

/*----------------------------CARD---------------------------------------*/
const addCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleCardFormSubmit,
})
addCardPopup.setEventListener();
//addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
})
/*------------------------- Section-------------------------- */
const cardSection = new Section({
  items: initialCards,
  renderer: renderCard,
},
  ".gallery__list");


/*                                                                          */
/*                                FORM VALIDATORS                           */
/*                                                                          */

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

cardSection.renderItems();