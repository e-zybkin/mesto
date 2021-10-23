const popup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupItem = document.querySelector('.popup_type_item');

const popupCloseButton = document.querySelectorAll('.popup__close-btn');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

const nameField = document.querySelector('.popup__input_type_name');
const nameOnPage = document.querySelector('.profile__name');
const statusField = document.querySelector('.popup__input_type_status');
const statusOnPage = document.querySelector('.profile__about');
const titleField = document.querySelector('.popup__input_type_title');

const picField = document.querySelector('.popup__input_type_pic');

const cardElement = document.querySelector('.template__card').content;
const cardsList = document.querySelector('.elements-grid');

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

function baseCardsCreate(item){
  const element = cardElement.querySelector('.elements-grid__element').cloneNode(true);
  element.querySelector('.elements-grid__pic').src = item.link;
  element.querySelector('.elements-grid__caption').innerText = item.name;
  element.querySelector('.elements-grid__like-button').addEventListener('click', (event)=>{
    event.target.classList.toggle('elements-grid__like-button_activated');
  });
  element.querySelector('.elements-grid__delete-button').addEventListener('click', (event)=>{
    event.target.closest('.elements-grid__element').remove();
  });
  return element;
}

function baseCardsAppend(item) {
  const element = baseCardsCreate(item);
  cardsList.append(element);
}

function cardsPrepend(item) {
  const element = baseCardsCreate(item);
  cardsList.prepend(element);
}

function openProfilePopup () {
  popupProfile.classList.add('popup_opened')
  nameField.value = nameOnPage.textContent
  statusField.value = statusOnPage.textContent
}

function openItemPopup () {
  popupItem.classList.add('popup_opened')
}

function closePopup () {
  popup.forEach((item) => {
	  item.classList.remove('popup_opened');
  })
}

function saveProfileChange(event) {
  event.preventDefault();
  nameOnPage.textContent = nameField.value;
  statusOnPage.textContent = statusField.value;
  closePopup()
}

function saveNewCard(event) {
  event.preventDefault();
  const title = titleField.value;
  const source = picField.value;
  const item = {
    name: title,
    link: source
  }
  cardsPrepend(item);
  event.target.reset();
  closePopup();
}

function clicker (event) {
  if(event.target.classList.contains('popup')){
    closePopup()
  }
}

initialCards.forEach(baseCardsAppend)

editButton.addEventListener('click', openProfilePopup)
addButton.addEventListener('click', openItemPopup)

popupCloseButton.forEach((item) => {
	item.addEventListener('click', closePopup)
})

popup.forEach((item)=> {
  item.addEventListener('mouseup', clicker)
})

formProfile.addEventListener('submit', saveProfileChange)
formCard.addEventListener('submit', saveNewCard)


