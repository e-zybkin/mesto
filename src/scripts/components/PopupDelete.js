import Popup from "./Popup.js"

class PopupDelete extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', ()=>{
      event.preventDefault();
      this._handleFormSubmit()
    })
  }
}

export default PopupDelete;
