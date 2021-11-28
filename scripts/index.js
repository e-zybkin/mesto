import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const nameOnPage = document.querySelector('.profile__name');
const statusInput = document.querySelector('.popup__input_type_status');
const statusOnPage = document.querySelector('.profile__about');
const titleInput = document.querySelector('.popup__input_type_title');
const picInput = document.querySelector('.popup__input_type_pic');

const cardsList = document.querySelector('.elements-grid');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

const popupProfile = document.querySelector('.popup_type_profile');
const popupItem = document.querySelector('.popup_type_item');

const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

const profileValidator = new FormValidator(formConfig, formProfile);
profileValidator.enableValidation();
const cardValidator = new FormValidator(formConfig, formCard);
cardValidator.enableValidation();

function createCard(item) {
  const card = new Card(cardConfig, item, '.template__card', openPopup);
  const view = card.render();
  return view;
}

function appendBaseCard(item) {
  const card = createCard(item);
  cardsList.append(card);
}

function prependBaseCard(item) {
  const card = createCard(item);
  cardsList.prepend(card);
}

function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
}

function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
}

function pressEsc (evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === "Escape") {
    closePopup(openedPopup)
  }
}

function clickOutOfPopup (evt) {
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target)
  }
}

function saveProfileChange(event) {
  event.preventDefault();
  nameOnPage.textContent = nameInput.value;
  statusOnPage.textContent = statusInput.value;
  closePopup(popupProfile)
}

function saveNewCard(event) {
  event.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: picInput.value
  }
  prependBaseCard(newCard);
  event.target.reset();
  closePopup(popupItem);
}

editButton.addEventListener('click', function(){
  nameInput.value = nameOnPage.textContent;
  statusInput.value = statusOnPage.textContent;
  profileValidator.isValid(nameInput, formProfile, formConfig);
  profileValidator.isValid(statusInput, formProfile, formConfig);
  profileValidator.toggleButtonState(formProfile, formConfig);
  openPopup(popupProfile)
})

addButton.addEventListener('click', function(){
  document.getElementById('cardForm').reset();
  cardValidator.hideInputError(titleInput, formCard, formConfig);
  cardValidator.hideInputError(picInput, formCard, formConfig);
  cardValidator.toggleButtonState(formCard, formConfig);
  openPopup(popupItem)
})

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', function(){
    closePopup(item.closest('.popup'))
  })
})

popups.forEach((item)=> {
  item.addEventListener('mouseup', clickOutOfPopup);
})

initialCards.forEach(appendBaseCard)

formProfile.addEventListener('submit', saveProfileChange)
formCard.addEventListener('submit', saveNewCard)
