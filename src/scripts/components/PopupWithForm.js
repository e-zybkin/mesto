
import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _listener = (event) => {
    console.log('сработало');
	  event.preventDefault();
	  this._formSubmit(this._getInputValues());
  }

  close() {
    this._popup.removeEventListener('submit', this._listener);
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._listener);
  }
}

export default PopupWithForm;
