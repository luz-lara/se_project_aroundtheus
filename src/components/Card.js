export default class Card {
  constructor(data, cardSelector,handleImageByClick,deleteCards,handleCardLike) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageByClick = handleImageByClick;
    this._deleteCards=deleteCards;
    this._deleteCardForm=document.forms["delete-card-form"];
    this.like = data.isLiked || false;
    this._cardId=this._data._id;
    this._handleCardLike= handleCardLike;

  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._deleteCardListener());
   this._likeButton.addEventListener("click", () =>this._handleCardLike(this._cardId,this));
    this._cardImageElement.addEventListener("click", () =>
     this._handleImageByClick(this)
    );
    this._LikeButtonListener();
  }
  handleLike(like) {
    console.log("Updating like status:", like);
    this.like = like;
    this._LikeButtonListener();
  }
  _LikeButtonListener() {
    if(this.like){
      this._likeButton.classList.add("card__like-button_active")
    }else{
      this._likeButton.classList.remove("card__like-button_active")

    }
  }
  _deleteCardListener() {
  this._deleteCardModal.classList.add("modal_opened");
  this._deleteCardForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //console.log(this._handleImageByClick);
    this._deleteCards(this._data._id);
    this._deleteCardModal.classList.remove("modal_opened");
    this._cardElement.remove();
    this._cardElement = null;
  })
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
    this._deleteCardModal=document.querySelector(".delete-card-modal");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    //filling the template
    this._cardTitle.textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    this._setEventListeners();
    this._LikeButtonListener();
    return this._cardElement;
  }
}
