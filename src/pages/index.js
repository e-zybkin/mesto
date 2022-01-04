
import './index.css';

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupDelete from '../scripts/components/PopupDelete.js';
import Avatar from '../scripts/components/Avatar.js';
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
  initialCards,
  editButton,
  addButton,
  avatarButton,
  nameInput,
  statusInput,
  formCard,
  formProfile,
  formAvatar,
  formConfig
} from '../scripts/utils/constants.js'

/*const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: 'ad4f580a-7f64-46a3-b778-5998764688dd',
    'Content-Type': 'application/json'
  }
});*/

const defaultSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    defaultSection.addItem(card, true);
  },
  containerSelector: '.elements-grid',
});
defaultSection.createElement();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  statusSelector: '.profile__about',
});

const avatar = new Avatar({
  avatarSelector: '.profile__avatar'
});

avatarButton.addEventListener('click',()=> {
  //avatarValidator.resetValidation(),
  avatarPopup.open()
})

const profileValidator = new FormValidator(formConfig, formProfile);
profileValidator.enableValidation();
const cardValidator = new FormValidator(formConfig, formCard);
cardValidator.enableValidation();
const avatarValidator = new FormValidator(formConfig, formAvatar)
avatarValidator.enableValidation();

const profPopup = new PopupWithForm('.popup_type_profile', {
  formSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profPopup.close();
  }
});

const cardPopup = new PopupWithForm('.popup_type_item',{
  formSubmit: (formData) => {
    defaultSection.addItem(createCard(formData), false);
    cardPopup.close();
  }
});

const avatarPopup = new PopupWithForm('.popup_type_avatar', {
  formSubmit: (formData) => {
    avatar.setAvatar(formData);
    avatarPopup.close();
  }
});

const popupImg = new PopupWithImage('.popup_type_picture');
popupImg.setEventListeners();

const popupDelete = new PopupDelete('.popup_type_delete', {
  handleFormSubmit: () => {}
});
popupDelete.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.template__card', handleCardClick, {
    handleDeleteIconClick: (card) => {
      popupDelete.open();
      popupDelete.setSubmitAction(() => {
        card.deleteCard();
        popupDelete.close();
      })
    }
  });
  const view = card.render();
  return view;
}

function handleCardClick(name, link) {
  popupImg.open(name, link);
}

editButton.addEventListener('click', function() {
  const obj = userInfo.getUserInfo();
  nameInput.value = obj.name;
  statusInput.value = obj.status;
  profileValidator.resetValidation();

  profPopup.open();
})

addButton.addEventListener('click', function(){
  cardValidator.resetValidation();
  cardPopup.open();
})

profPopup.setEventListeners();

cardPopup.setEventListeners();

avatarPopup.setEventListeners();
