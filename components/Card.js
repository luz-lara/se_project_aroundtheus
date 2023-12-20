export default class Card {
    constructor(data, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
    }
    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => this._deleteCard());
        this._likeButton.addEventListener("click",() => this._toggleLikeButton());
        this._cardImageElement.addEventListener("click",()=> this._handleImageByClick());
    }
    _toggleLikeButton() {
         this._likeButton.classList.toggle("card__like-button_active");
 
    }
    _deleteCard() {
        this._cardElement.remove();
        this._cardElement=null;
    }
    _handleImageByClick(data){
        handleImageByClick();
    }
    viewCard() {
        this._cardElement= document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
        this._cardTitle = this._cardElement.querySelector(".card__title");
        this._cardImageElement = this._cardElement.querySelector(".card__image");
        this._cardListEl=document.querySelector(".gallery__list");
        this._deleteButton = this._cardElement.querySelector(".card__delete-button");
        this._likeButton=this._cardElement.querySelector(".card__like-button")
        //filling the template 
        this._cardTitle.textContent = this._data.name;
        this._cardImageElement.src = this._data.link;
        this._cardImageElement.alt = this._data.name;
        this._setEventListeners();
        return this._cardElement;
        
    }
   
   
    }
       
    
