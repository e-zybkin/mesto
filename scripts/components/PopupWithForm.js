
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
  
  close() {
    this._popup.removeEventListener('submit', (event)=> {
      event.preventDefault();
      this._formSubmit(this._getInputValues())
    });
    super.close();
    this._popup.queryselector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event)=> {
      event.preventDefault();
      this._formSubmit(this._getInputValues())
    });
  }
}

export default PopupWithForm;
