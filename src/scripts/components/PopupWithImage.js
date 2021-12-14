
import Popup from "./Popup.js";
import {cardConfig} from "../utils/constants.js";

class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(cardConfig.picImageOnPage);
    this._caption = this._popup.querySelector(cardConfig.picCaptionOnPage);
  }

  open(name, link) {
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
