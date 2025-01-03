export default class Card {
  constructor(data, cardSelector, handleImageByClick, deleteCard, handleCardLike) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageByClick = handleImageByClick;
    this._deleteCard = deleteCard
    this.like = data.isLiked || false;
    this._cardId = this._data._id;
    this._handleCardLike = handleCardLike;
    this._defaultButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";

  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._deleteCard(this._cardId, this._cardElement));
    this._likeButton.addEventListener("click", () => this._handleCardLike(this._cardId, this));
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageByClick(this)
    );
    this._likeButtonListener();

  }
  handleLike(like) {
    console.log("Updating like status:", like);
    this.like = like;
    this._likeButtonListener();
  }
  _likeButtonListener() {
    if (this.like) {
      this._likeButton.classList.add("card__like-button_active")
    } else {
      this._likeButton.classList.remove("card__like-button_active")

    }
  }

  viewCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardTitle.textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    this._setEventListeners();
    this._likeButtonListener();
    return this._cardElement;
  }
}
