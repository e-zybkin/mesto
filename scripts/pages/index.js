import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
}

const cardConfig = {
  picCaptionOnPage: '.popup__picture-caption',
  picImageOnPage: '.popup__picture-image',
  popupPic: '.popup_type_picture',
  likeButton: '.elements-grid__like-button',
  likeButtonActive: 'elements-grid__like-button_activated',
  deleteButton: '.elements-grid__delete-button',
  picture: '.elements-grid__pic',
  caption: '.elements-grid__caption',
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__input_type_name');
const statusInput = document.querySelector('.popup__input_type_status');
const titleInput = document.querySelector('.popup__input_type_title');
const picInput = document.querySelector('.popup__input_type_pic');

const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

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

const profileValidator = new FormValidator(formConfig, formProfile);
profileValidator.enableValidation();
const cardValidator = new FormValidator(formConfig, formCard);
cardValidator.enableValidation();

function createCard(item) {
  const card = new Card(cardConfig, item, '.template__card', handleCardClick);
  const view = card.render();
  return view;
}

function handleCardClick(name, link) {
  const popupImg = new PopupWithImage('.popup_type_picture', cardConfig);
  popupImg.open(name, link);
}

const profPopup = new PopupWithForm('.popup_type_profile', {
  formSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profPopup.close();
  }
});

editButton.addEventListener('click', function() {
  const obj = userInfo.getUserInfo();
  nameInput.value = obj.name;
  statusInput.value = obj.status;
  profileValidator.isValid(nameInput, formProfile, formConfig);
  profileValidator.isValid(statusInput, formProfile, formConfig);
  profileValidator.toggleButtonState(formProfile, formConfig);
  profPopup.open();
})

const cardPopup = new PopupWithForm('.popup_type_item',{
  formSubmit: (formData) => {
    defaultSection.addItem(createCard(formData), false);
    //document.getElementById('cardForm').reset();
    cardPopup.close();
  }
});

addButton.addEventListener('click', function(){
  cardValidator.hideInputError(titleInput, formCard, formConfig);
  cardValidator.hideInputError(picInput, formCard, formConfig);
  cardValidator.toggleButtonState(formCard, formConfig);
  cardPopup.open();
})
