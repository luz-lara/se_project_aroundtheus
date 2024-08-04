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
const profileModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector(".modal__input-name");
const profileDescriptionInput = document.querySelector(
  ".modal__input-description"
);
const profileAddButton = document.querySelector(".profile__add-button");

/*                                                                          */
/*                                ADD CARD CONSTANTS                        */
/*                                                                          */
const addCardModal = document.querySelector("#profile-add-modal");
const cardListEl = document.querySelector(".gallery__list");


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
  cardListEl.prepend(newCard);
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
const defaultCardList = new Section({
  items: initialCards,
  renderer: renderCard,
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