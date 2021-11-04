const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupItem = document.querySelector('.popup_type_item');
const popupPic = document.querySelector('.popup_type_picture');

const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

const nameInput = document.querySelector('.popup__input_type_name');
const nameOnPage = document.querySelector('.profile__name');
const statusInput = document.querySelector('.popup__input_type_status');
const statusOnPage = document.querySelector('.profile__about');
const titleInput = document.querySelector('.popup__input_type_title');

const picCaptionOnPage = document.querySelector('.popup__picture-caption');
const picImageOnPage = document.querySelector('.popup__picture-image');

const picInput = document.querySelector('.popup__input_type_pic');

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

function createBaseCard(item){
  const element = cardElement.querySelector('.elements-grid__element').cloneNode(true);
  element.querySelector('.elements-grid__pic').src = item.link;
  element.querySelector('.elements-grid__caption').innerText = item.name;
  element.querySelector('.elements-grid__pic').alt = item.name;
  element.querySelector('.elements-grid__like-button').addEventListener('click', (event)=>{
    event.target.classList.toggle('elements-grid__like-button_activated');
  });
  element.querySelector('.elements-grid__delete-button').addEventListener('click', ()=>{
    element.remove();
  });

  element.querySelector('.elements-grid__pic').addEventListener('click', ()=>{
    picCaptionOnPage.textContent = item.name;
    picImageOnPage.src = item.link;
    picImageOnPage.alt = item.name;
    openPopup(popupPic);
  })
  return element;
}

function appendBaseCard(item) {
  const element = createBaseCard(item);
  cardsList.append(element);
}

function prependBaseCard(item) {
  const element = createBaseCard(item);
  cardsList.prepend(element);
}

function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
}

function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
}

function saveProfileChange(event) {
  event.preventDefault();
  nameOnPage.textContent = nameInput.value;
  statusOnPage.textContent = statusInput.value;
  closePopup(popupProfile)
}

function saveNewCard(event) {
  event.preventDefault();
  const title = titleInput.value;
  const source = picInput.value;
  const item = {
    name: title,
    link: source
  }
  prependBaseCard(item);
  event.target.reset();
  closePopup(popupItem);
}

function clickOutOfPopup (evt) {
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target)
  }
}

function pressEsc (evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === "Escape") {
    closePopup(openedPopup)
  }
}

initialCards.forEach(appendBaseCard)

editButton.addEventListener('click', function(){
  nameInput.value = nameOnPage.textContent;
  statusInput.value = statusOnPage.textContent;
  isValid(nameInput, formProfile, config);
  isValid(statusInput, formProfile, config);
  toggleButtonState(formProfile, config);
  openPopup(popupProfile)
})

addButton.addEventListener('click', function(){
  titleInput.value = '';
  picInput.value = '';
  hideInputError(titleInput, formCard, config);
  hideInputError(picInput, formCard, config);
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

formProfile.addEventListener('submit', saveProfileChange)
formCard.addEventListener('submit', saveNewCard)


