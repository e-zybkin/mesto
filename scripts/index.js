const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');
const editButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__input_type_name');
const nameOnPage = document.querySelector('.profile__name');
const statusField = document.querySelector('.popup__input_type_status');
const statusOnPage = document.querySelector('.profile__about');



function openPopup () {
  popup.classList.add('popup_opened')
  nameField.value = nameOnPage.textContent
  statusField.value = statusOnPage.textContent
}

function closePopup () {
  popup.classList.remove('popup_opened')
}

function saveForm(event) {
  event.preventDefault()
  nameOnPage.textContent = nameField.value
  statusOnPage.textContent = statusField.value
  closePopup()
}

function clicker (event) {
  if(event.target.classList.contains('popup')){
    closePopup()
  }
}


editButton.addEventListener('click', openPopup)

popupCloseButton.addEventListener('click', closePopup)

form.addEventListener('submit', saveForm)

popup.addEventListener('mouseup', clicker)
