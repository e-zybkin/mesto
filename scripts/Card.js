class Card {
  constructor(config, item, selector, openPopup) {
    this._config = config;
    this._item = item;
    this._selector = selector
    this._openPopup = openPopup;
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

  _like() {
    event.target.classList.toggle(this._config.likeButtonActive);
  }

  _openPic() {
    document.querySelector(this._config.picCaptionOnPage).textContent = this._item.name;
    document.querySelector(this._config.picImageOnPage).src = this._item.link;
    document.querySelector(this._config.picImageOnPage).alt = this._item.name;
    this._openPopup(document.querySelector(this._config.popupPic));
  }

  _eventListeners() {
    this._element.querySelector(this._config.likeButton).addEventListener('click', (event)=> this._like());
    this._element.querySelector(this._config.deleteButton).addEventListener('click', ()=> this._remove());
    this._element.querySelector(this._config.picture).addEventListener('click', ()=> this._openPic());
  }

  render(){
    this._element = this._getTemplate();
    this._element.querySelector(this._config.picture).src = this._item.link;
    this._element.querySelector(this._config.caption).textContent = this._item.name;
    this._element.querySelector(this._config.picture).alt = this._item.name;
    this._eventListeners();
    return this._element;
  }
}

export default Card;
