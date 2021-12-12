
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event)=> this._handleEscClose());
  }

  _clickOutOfPopup () {
    if(event.target.classList.contains('popup')){
      this.close();
    }
  }

  _handleEscClose() {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-btn').addEventListener('click', ()=> this.close());
    this._popup.addEventListener('mouseup', (event)=> this._clickOutOfPopup());
    document.addEventListener('keydown', (event)=> this._handleEscClose());
  }
}

export default Popup;
