import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { config } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
const avatarForm = document.forms["change-profile-image-form"];
const editProfileImageIcon = document.querySelector(".profile__image-pencil");
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
  // renderCard({ name, link });
  addCardPopup.renderLoading(true);
  api
    .createNewCard(name, link)
    .then((data) => {
      renderCard(data);
      addCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.toggleButtonState();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}
const handleCardLike = (cardId, cardInstance) => {
  const isItLiked = cardInstance.like;
  console.log(cardInstance.like);
  const toggleLike = isItLiked
    ? api.likeButtonDeactive(cardId)
    : api.likeButtonActive(cardId);
  toggleLike
    .then((updatedCardData) => {
      cardInstance.handleLike(!isItLiked);
    })
    .catch((err) => {
      console.error("like toogle error:", err);
    });
};
function createCard(cardData) {
  const cardElements = new Card(
    cardData,
    "#card-template",
    () => {
      cardImagePopup.open(cardData);
    },
    (cardId) => {
      deleteCardPopup.open(cardId);
    },
    handleCardLike
  );

  return cardElements.viewCard();
}

function renderCard(cardData) {
  const newCard = createCard(cardData);
  newCard.id = cardData._id;
  cardSection.addItem(newCard);
}

/*                                                                          */
/*                                EVENT LISTENERS                           */
/*                                                                          */
/*change profile picture*/

editProfileImageIcon.addEventListener("click", () => {
  changeProfilePhoto.open();
});
/*-------------------------------PROFILE ----------------------------------*/
profileEditButton.addEventListener("click", () => {
  const { title, job } = profileInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = job;
  profileEditPopup.open();
});
const changeProfilePhoto = new PopupWithForm({
  popupSelector: "#change__profile_picture",
  handleFormSubmit: (data) => {
    changeProfilePhoto.renderLoading(true);
    api
      .profilePicture(data.avatar)
      .then((res) => {
        profileInfo.setAvatar(res.avatar);
        changeAvatarFormValidator.toggleButtonState;
        changeProfilePhoto.close();
      })
      .catch((err) => {
        console.error("Avatar update error:", err);
      })
      .finally(() => {
        changeProfilePhoto.renderLoading(false);
      });
  },
});
changeProfilePhoto.setEventListener();
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: ({ title, description }) => {
    profileEditPopup.renderLoading(true);
    api
      .updateProfile(title, description)
      .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error("Update card error:", err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });
  },
});

profileEditPopup.setEventListener();

/*---------------------------USER INFO---------------------------------*/
const profileInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

/*----------------------------CARD---------------------------------------*/
const addCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});
addCardPopup.setEventListener();
//addCardForm.addEventListener("submit", handleAddCardFormSubmit);
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});
/*-------------------------CARD deletion -----------*/
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: (cardId, cardElement) => {
    deleteCardPopup.setLoadingState(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Delete card error:", err);
      })
      .finally(() => {
        // Reset the loading state regardless of success or error
        deleteCardPopup.setLoadingState(false);
      });
  },
});
deleteCardPopup.setEventListener();

/*------------------------- Section-------------------------- */
const cardSection = new Section(
  {
    renderer: renderCard,
  },
  ".gallery__list"
);
//Get user user cards

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((data) => {
    profileInfo.setUserInfo(data.name, data.about, data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });
/*                                                                          */
/*                                FORM VALIDATORS                           */
/*                                                                          */

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const changeAvatarFormValidator = new FormValidator(config, avatarForm);
changeAvatarFormValidator.enableValidation();
//cardSection.renderItems();
