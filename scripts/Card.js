class Card {
  constructor(config, item, template, openPopup) {
    this._config = config;
    this._item = item;
    this._view = template.querySelector(this._config.cardElement).cloneNode(true);
    this._openPopup = openPopup;
  }

  _remove() {
    this._view.remove();
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
    this._view.querySelector(this._config.likeButton).addEventListener('click', (event)=> this._like());
    this._view.querySelector(this._config.deleteButton).addEventListener('click', ()=> this._remove());
    this._view.querySelector(this._config.picture).addEventListener('click', ()=> this._openPic());
  }

  render(){
    this._view.querySelector(this._config.picture).src = this._item.link;
    this._view.querySelector(this._config.caption).innerText = this._item.name;
    this._view.querySelector(this._config.picture).alt = this._item.name;
    this._eventListeners();
    return this._view;
  }
}

export default Card;
