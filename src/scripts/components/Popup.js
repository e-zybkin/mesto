
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mouseup', this._clickOutOfPopup);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mouseup', this._clickOutOfPopup);
  }

  _clickOutOfPopup = (event) => {
    if(event.target.classList.contains('popup')){
      this.close();
    }
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-btn').addEventListener('click', ()=> this.close());
  }
}

export default Popup;
