export const initialCards = [
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

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
}

export const cardConfig = {
  picCaptionOnPage: '.popup__picture-caption',
  picImageOnPage: '.popup__picture-image',
  popupPic: '.popup_type_picture',
  likeButton: '.elements-grid__like-button',
  likeButtonActive: 'elements-grid__like-button_activated',
  deleteButton: '.elements-grid__delete-button',
  picture: '.elements-grid__pic',
  caption: '.elements-grid__caption',
}

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__cover');

export const nameInput = document.querySelector('.popup__input_type_name');
export const statusInput = document.querySelector('.popup__input_type_status');

export const formProfile = document.querySelector('.popup__form_type_profile');
export const formCard = document.querySelector('.popup__form_type_card');
export const formAvatar = document.querySelector('.popup__form_type_avatar');
