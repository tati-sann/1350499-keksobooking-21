'use strict';
(() => {
  const adForm = document.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const address = adForm.querySelector(`#address`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const title = adForm.querySelector(`#title`);
  const price = adForm.querySelector(`#price`);
  const type = adForm.querySelector(`#type`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const avatar = adForm.querySelector(`#avatar`);
  const images = adForm.querySelector(`#images`);

  const ROOM_MAX = 100;
  const ROOM_MIN = 0;
  const TitleSymbols = {
    MIN: 30,
    MAX: 100
  };
  const PRICE_MAX = 1000000;
  const PriceMin = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const validateRooms = () => {
    const roomNumberValue = parseInt(roomNumber.value, 10);
    const capacityValue = parseInt(capacity.value, 10);
    let validationMessage = ``;

    if (roomNumberValue < capacityValue) {
      validationMessage = `Недопустимое количество гостей для выбранного количества комнат`;
    } else if (roomNumberValue < ROOM_MAX && capacityValue === ROOM_MIN) {
      validationMessage = `Для данного количества комнат необходимо выбрать количество гостей`;
    } else if (roomNumberValue === ROOM_MAX && capacityValue > ROOM_MIN) {
      validationMessage = `Выбранное количество комнат не предназначено для гостей`;
    } else {
      capacity.valid = true;
    }

    capacity.setCustomValidity(validationMessage);
  };

  const validateTitle = () => {
    title.setAttribute(`required`, `true`);
    title.setAttribute(`minlength`, TitleSymbols.MIN);
    title.setAttribute(`maxlength`, TitleSymbols.MAX);
  };

  const validatePrice = () => {
    price.setAttribute(`required`, `true`);
    price.setAttribute(`max`, PRICE_MAX);

    if (type.value === `bungalow`) {
      price.setAttribute(`min`, PriceMin.bungalo);
      price.setAttribute(`placeholder`, PriceMin.bungalo);
    } else if (type.value === `flat`) {
      price.setAttribute(`min`, PriceMin.flat);
      price.setAttribute(`placeholder`, PriceMin.flat);
    } else if (type.value === `house`) {
      price.setAttribute(`min`, PriceMin.house);
      price.setAttribute(`placeholder`, PriceMin.house);
    } else if (type.value === `palace`) {
      price.setAttribute(`min`, PriceMin.palace);
      price.setAttribute(`placeholder`, PriceMin.palace);
    }
  };

  const readonlyAddress = () => {
    address.setAttribute(`readonly`, `true`);
  };

  const synchronizeTimes = (time, value) => {
    time.value = value;
  };

  const limitImage = () => {
    [avatar, images].forEach((input) => {
      input.setAttribute(`accept`, `image/*`);
    });
  };

  const validateForm = () => {
    [roomNumber, capacity].forEach((input) => {
      input.addEventListener(`change`, () => {
        validateRooms();
      });
    });

    title.addEventListener(`change`, () => {
      validateTitle();
    });

    [price, type].forEach((input) => {
      input.addEventListener(`change`, () => {
        validatePrice();
      });
    });

    timeIn.addEventListener(`change`, () => {
      synchronizeTimes(timeOut, timeIn.value);
    });

    timeOut.addEventListener(`change`, () => {
      synchronizeTimes(timeIn, timeOut.value);
    });

    validateRooms();
    validateTitle();
    validatePrice();
    readonlyAddress();
    limitImage();
  };

  const disableFieldset = () => {
    adFormFieldset.forEach((fieldset) => fieldset.setAttribute(`disabled`, `true`));
  };

  const enableFieldset = () => {
    adFormFieldset.forEach((fieldset) => fieldset.removeAttribute(`disabled`));
  };

  const resetForm = () => {
    adForm.reset();
  };

  const disableForm = () => {
    adForm.classList.add(`ad-form--disabled`);
    disableFieldset();
    resetForm();
  };

  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
    enableFieldset();
    validateForm();
  };

  const onSuccess = () => {
    resetForm();
    window.message.successMessage();
    window.main.disactivatePage();
  };

  const onError = () => {
    window.message.errorMessage();
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), onSuccess, onError);
  };

  adForm.addEventListener(`submit`, onFormSubmit);

  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.main.disactivatePage();
  });

  window.form = {
    disableForm,
    enableForm
  };
})();
