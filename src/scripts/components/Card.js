import {cardConfig} from "../utils/constants.js";

class Card {
  constructor(item, selector, handleCardClick, {handleDeleteIconClick, handleLikeClick}) {
    this._item = item;
    this._ownerId = item._id;
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

  _likeButton = (event) => {
    event.target.classList.toggle(cardConfig.likeButtonActive);
    //this._handleLikeClick();
  }

  //like()

  _eventListeners() {
    this._element.querySelector(cardConfig.likeButton).addEventListener('click', this._like);
    this._element.querySelector(cardConfig.deleteButton).addEventListener('click', () => {this._handleDeleteIconClick(this)});
    this._cardImage.addEventListener('click', ()=> this._handleCardClick(this._item.name, this._item.link));
  }

  render(){
    this._element = this._getTemplate();
    //console.log(this._item._id)
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
