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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//preview image modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewCloseButton = document.querySelector(".preview__close-button");
//form data
const cardTitle = addCardModal.querySelector(".modal__input-title");
const cardLink = addCardModal.querySelector(".modal__input-url");
const addCardForm = document.forms["add-card-form"];
//functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitle.value;
  const link = cardLink.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
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

closeEditButton.addEventListener("click", () => {
  closePopup(profileModal);
});
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

previewCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);
//event listeners submit
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const previewModalTitle = document.querySelector(".preview__title");
  const previewImage = document.querySelector(".modal__preview-image");

  //event listeners
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewModalTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  cardTitle.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});