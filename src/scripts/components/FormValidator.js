
class FormValidator {
  constructor(config, formName) {
    this._form = formName;
    this._config = config;
    this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    this._form.addEventListener('input', () => this._toggleButtonState());
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this.isValid(inputElement))
    });

    this._toggleButtonState();
  };

  _handleSubmit(event) {
    event.preventDefault();
  }

  _toggleButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input)
    }
    else {
      this._hideInputError(input)
    }
  };

  _showInputError (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  };

  _hideInputError (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };
}

export default FormValidator;
