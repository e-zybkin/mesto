
import Popup from "./Popup.js";

class PopupWithImage extends Popup{
  constructor(popupSelector, config) {
    super(popupSelector);
    this._config = config;
  }

  open(name, link) {
    document.querySelector(this._config.picCaptionOnPage).textContent = name;
    document.querySelector(this._config.picImageOnPage).src = link;
    document.querySelector(this._config.picImageOnPage).alt = name;
    super.open();
  }
}

export default PopupWithImage;
