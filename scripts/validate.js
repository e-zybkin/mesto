function enableValidation(validationConfig) {
  const forms = [...document.querySelectorAll(validationConfig.formSelector)];
  forms.forEach((form) => setFormListeners(form, validationConfig));
};

function setFormListeners(form, config) {
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', () => toggleButtonState(form, config));

  const inputs = [...form.querySelectorAll(config.inputSelector)];

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => isValid(inputElement, form, config))
  });

  toggleButtonState(form, config);
};

function handleSubmit(event) {
  event.preventDefault();
}

function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function isValid(input, form, config) {
  if (!input.validity.valid) {
    showInputError(input, form, config)
  }
  else {
    hideInputError(input, form, config)
  }
};

function showInputError (input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

function hideInputError (input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};
