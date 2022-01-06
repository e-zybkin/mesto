
import './index.css';

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupDelete from '../scripts/components/PopupDelete.js';
import Avatar from '../scripts/components/Avatar.js';
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import {
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

let userId;

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'ad4f580a-7f64-46a3-b778-5998764688dd'
});

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  defaultSection.createElement(cards);
  avatar.setAvatar(userData)
  userId = userInfo.getUserId(userData);
})

const defaultSection = new Section({
  renderer: (item) => {
    //console.log(item);
    const card = createCard(item);
    defaultSection.addItem(card, true);
  },
  containerSelector: '.elements-grid',
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  statusSelector: '.profile__about',
});

const avatar = new Avatar({
  avatarSelector: '.profile__avatar'
});

avatarButton.addEventListener('click',()=> {
  avatarValidator.resetValidation(),
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
    const needPopup = document.querySelector('.popup_type_profile');
    const finalText = needPopup.querySelector(formConfig.submitButtonSelector).textContent;
    renderLoading(true, needPopup, finalText)
    api.setUserData(formData)
    .then(result => {
      userInfo.setUserInfo(result);
    })
    .catch(error => {console.log('ОШИБКА: ', error)})
    .finally(()=>{
      profPopup.close();
      renderLoading(false, needPopup, finalText);
    });
  }
});

const cardPopup = new PopupWithForm('.popup_type_item',{
  formSubmit: (formData) => {
    const needPopup = document.querySelector('.popup_type_item');
    const finalText = needPopup.querySelector(formConfig.submitButtonSelector).textContent;
    renderLoading(true, needPopup, finalText)
    api.setNewCard(formData)
    .then(result => {
      defaultSection.addItem(createCard(result), false)
    })
    .catch(error => console.log('ОШИБКА: ', error))
    .finally(()=>{
      cardPopup.close();
      renderLoading(false, needPopup, finalText);
    });
  }
});

const avatarPopup = new PopupWithForm('.popup_type_avatar', {
  formSubmit: (formData) => {
    const needPopup = document.querySelector('.popup_type_avatar');
    const finalText = needPopup.querySelector(formConfig.submitButtonSelector).textContent;
    renderLoading(true, needPopup, finalText)
    api.setUserAvatar(formData)
    .then(result => {
      avatar.setAvatar(result)
    })
    .catch(error => {console.log('ОШИБКА: ', formData)})
    .finally(()=>{
      avatarPopup.close();
      renderLoading(false, needPopup, finalText);
    });
  }
});

const popupImg = new PopupWithImage('.popup_type_picture');
popupImg.setEventListeners();

const popupDelete = new PopupDelete('.popup_type_delete', {
  handleFormSubmit: () => {}
});

function renderLoading(isLoading, needPopup, finalText) {
  if(isLoading) {
    needPopup.querySelector(formConfig.submitButtonSelector).textContent = "Сохранение...";
  }
  else {
    needPopup.querySelector(formConfig.submitButtonSelector).textContent = finalText;
  }
}

function createCard(item) {
  const card = new Card(item, '.template__card', handleCardClick, {
    handleDeleteIconClick: (card) => {
      popupDelete.open();
      popupDelete.setSubmitAction(() => {
        card.deleteCard();
        popupDelete.close();
      })
    },
    handleLikeClick: () => {
      if (!item.likes.some(like => like['_id'] === userId)) {
        api.putLike(item)
        .then(result => {
          item = result;
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        api.deleteLike(item)
        .then(result => {
          item = result;
        })
        .catch(error => {
          console.log(error)
        })
      }
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

popupDelete.setEventListeners();
