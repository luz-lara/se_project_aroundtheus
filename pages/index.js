import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCards, config } from "../utils/constants.js";

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


/*                                                                          */
/*                             FUNCTIONS                                    */
/*                                                                          */
/*closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});
*/
function handleEscape(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", closeModalByClick);
}
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", closeModalByClick);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitle.value;
  const link = cardLink.value;
  renderCard({ name, link });
  closePopup(addCardModal);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

function closeModalByClick(evt) {
  if (evt.target.classList.contains("modal_opened")) closePopup(evt.target);
}

function createCard(cardData) {
  const cardElements = new Card(cardData, "#card-template", () => {
    previewImage.src = cardData.link;
    previewModalTitle.textContent = cardData.name;
    previewImage.alt = cardData.name;
    openModal(previewImageModal);
  });
  return cardElements.viewCard();
}
function renderCard(cardData) {
  const newCard = createCard(cardData);
  cardListEl.prepend(newCard);
}
function handleImageClick(name, link) {
  cardImagePopup.open(name, link);
}


/*                                                                          */
/*                                EVENT LISTENERS                           */
/*                                                                          */

/*-------------------------------PROFILE ----------------------------------*/
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardModal);
});
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileModal);
  profileForm.reset();
  profileFormValidator.toggleButtonState();
});
/*----------------------------CARD---------------------------------------*/
const addCardPopup = new PopupWithForm(config.modalAddCard, (data) => {
  const newCard = createCard(data);
  addCardPopup.close();
  cardSection.addItem(newCard);
})
addCardPopup.setEventListeners();
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
/*------------------------- Section-------------------------- */
const defaultCardList = new Section({
  items: initialCards,
  renderer:renderCard,
},
".gallery__list");

const cardImagePopup = new PopupWithImage("#preview-image-modal");
cardImagePopup.setEventListeners();

/*                                                                          */
/*                                FORM VALIDATORS                           */
/*                                                                          */

const profileFormValidator = new FormValidator(config, profileModal);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardModal);
addCardFormValidator.enableValidation();

defaultCardList.renderItems();