
import './index.css';

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupDelete from '../scripts/components/PopupDelete.js';
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
  userId = userInfo.getUserId(userData);
  defaultSection.createElement(cards);
  userInfo.setAvatar(userData)
  userInfo.setUserInfo(userData);
})

const defaultSection = new Section({
  renderer: (item) => {
    const card = createCard(item);
    defaultSection.addItem(card, true);
  },
  containerSelector: '.elements-grid',
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  statusSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
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
      profPopup.close();
    })
    .catch(error => {console.log('ОШИБКА: ', error)})
    .finally(()=>{
      renderLoading(false, needPopup, finalText);
    });
  }
});

const cardPopup = new PopupWithForm('.popup_type_card',{
  formSubmit: (formData) => {
    const needPopup = document.querySelector('.popup_type_card');
    const finalText = needPopup.querySelector(formConfig.submitButtonSelector).textContent;
    renderLoading(true, needPopup, finalText)
    api.setNewCard(formData)
    .then(result => {
      defaultSection.addItem(createCard(result), false);
      cardPopup.close();
    })
    .catch(error => console.log('ОШИБКА: ', error))
    .finally(()=>{
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
      userInfo.setAvatar(result)
      avatarPopup.close();
    })
    .catch(error => {console.log('ОШИБКА: ', error)})
    .finally(()=>{
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
  const card = new Card(item, userId, '.template__card', handleCardClick, {
    handleDeleteIconClick: (card) => {
      popupDelete.open();
      popupDelete.setSubmitAction(() => {
        api.deleteCard(item)
        .then( result => {
          card.deleteCard();
          popupDelete.close();
        })
        .catch(error => {console.log('ОШИБКА: ', error)})
      })
    },
    handleLikeClick: () => {
      if (!item.likes.some(like => like['_id'] === userId)) {
        api.putLike(item)
        .then(result => {
          item = result;
          card.updateLikeCounter(item);
          card.likeButton(item);
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        api.deleteLike(item)
        .then(result => {
          item = result;
          card.updateLikeCounter(item);
          card.likeButton(item);
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
