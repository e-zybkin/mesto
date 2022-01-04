import {cardConfig} from "../utils/constants.js";

class Card {
  constructor(item, selector, handleCardClick, {handleDeleteIconClick}) {
    this._item = item;
    this._selector = selector
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

  _like = (event) => {
    event.target.classList.toggle(cardConfig.likeButtonActive);
  }

  _eventListeners() {
    this._element.querySelector(cardConfig.likeButton).addEventListener('click', this._like);
    this._element.querySelector(cardConfig.deleteButton).addEventListener('click', () => {this._handleDeleteIconClick(this)});
    this._cardImage.addEventListener('click', ()=> this._handleCardClick(this._item.name, this._item.link));
  }

  render(){
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(cardConfig.picture);
    this._cardImage.src = this._item.link;
    this._element.querySelector(cardConfig.caption).textContent = this._item.name;
    this._cardImage.alt = this._item.name;
    this._eventListeners();
    return this._element;
  }
}

export default Card;
