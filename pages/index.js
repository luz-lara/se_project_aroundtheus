import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

const config = {
  formSelector: "modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//profile edit modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");
const profileModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector(".modal__input-name");
const profileDescriptionInput = document.querySelector(
  ".modal__input-description"
);
const profileForm = document.forms["profile-form"];
const closeEditButton = profileModal.querySelector(".modal__close-button");
//add card modal
const addCardModal = document.querySelector("#profile-add-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const cardListEl = document.querySelector(".gallery__list");

//preview image modal
const previewModalTitle = document.querySelector(".modal__preview-title");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageModal = document.querySelector("#preview-image-modal");
const cardTitle = addCardModal.querySelector(".modal__input-title");
const cardLink = addCardModal.querySelector(".modal__input-url");
const addCardForm = document.forms["add-card-form"];
const closeButtons = document.querySelectorAll(".modal__close-button");

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
//event listeners click
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardModal);
});

/*function createCard(cardData) {
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
*/
//event listeners submit
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileModal);
  profileForm.reset();
  profileFormValidator.toggleButtonState();
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, "#card-template", () => {
      const previewImagePopup = new PopupWithImage("#preview-image-modal")
       previewImagePopup.open(item);
       previewImagePopup.setEventListeners();
    });
    const card = cardElement.viewCard();
    defaultCardList.addItem(card);
  }
}, ".gallery__list");

//const popupClose= new Popup ("#profile-edit-modal");
//popupClose.setEventListeners();

/*initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});
*/
const profileFormValidator = new FormValidator(config, profileModal);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardModal);
addCardFormValidator.enableValidation();

defaultCardList.renderItems();