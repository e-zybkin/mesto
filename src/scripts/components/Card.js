import {cardConfig} from "../utils/constants.js";

class Card {
  constructor(item, userId, selector, handleCardClick, {handleDeleteIconClick, handleLikeClick}) {
    this._item = item;
    this._ownerId = item.owner._id;
    this._ourId = userId;
    this._selector = selector
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.elements-grid__element')
    .cloneNode(true);
    return cardElement;
  }

  _remove() {
    this._element.remove();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likeButton(data) {
    if(data.likes.some(like => like['_id'] === this._ourId)) {
      this._element.querySelector(cardConfig.likeButton).classList.add(cardConfig.likeButtonActive);
    } else {
      this._element.querySelector(cardConfig.likeButton).classList.remove(cardConfig.likeButtonActive);
    }
  }

  updateLikeCounter (data) {
    this._element.querySelector(cardConfig.likeCounter).textContent = data.likes.length;
  }

  _eventListeners() {
    if(this._item.likes.some(like => like['_id'] === this._ourId)) {
      this._element.querySelector(cardConfig.likeButton).classList.add(cardConfig.likeButtonActive);
    } else {
      this._element.querySelector(cardConfig.likeButton).classList.remove(cardConfig.likeButtonActive);
    }
    this._element.querySelector(cardConfig.likeButton).addEventListener('click', this._handleLikeClick);
    this._cardImage.addEventListener('click', ()=> this._handleCardClick(this._item.name, this._item.link));
    if(this._ownerId === this._ourId) {
      this._element.querySelector(cardConfig.deleteButton).addEventListener('click', () => {this._handleDeleteIconClick(this)});
    } else {
      this._element.querySelector(cardConfig.deleteButton).remove();
    }
  }

  render(){
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(cardConfig.picture);
    this._cardImage.src = this._item.link;
    this._element.querySelector(cardConfig.caption).textContent = this._item.name;
    this._cardImage.alt = this._item.name;
    this._element.querySelector(cardConfig.likeCounter).textContent = this._item.likes.length;
    this._eventListeners();
    return this._element;
  }
}

export default Card;
