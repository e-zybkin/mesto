class FormValidator {
  constructor(config, formName) {
    this._form = formName;
    this._config = config;
  }

  enableValidation() {
    const forms = [...document.querySelectorAll(this._config.formSelector)];
    forms.forEach((form) => this._setEventListeners(this._form, this._config));
  };

  _setEventListeners(form, config) {
    form.addEventListener('submit', this._handleSubmit);
    form.addEventListener('input', () => this.toggleButtonState(form, config));

    const inputs = [...form.querySelectorAll(config.inputSelector)];

    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this.isValid(inputElement, form, config))
    });

    this.toggleButtonState(form, config);
  };

  _handleSubmit(event) {
    event.preventDefault();
  }

  toggleButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  }

  isValid(input, form, config) {
    if (!input.validity.valid) {
      this._showInputError(input, form, config)
    }
    else {
      this.hideInputError(input, form, config)
    }
  };

  _showInputError (input, form, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  };

  hideInputError (input, form, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
}

export default FormValidator;
