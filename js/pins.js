'use strict';
(() => {
  const MAX_PINS = 5;
  let PINS = [];

  const getPins = () => PINS;

  const removeClassActivePin = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const getPin = (pinData) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = `${pinData.location.x - img.width / 2}px`;
    pinElement.style.top = `${pinData.location.y - img.height}px`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    pinElement.addEventListener(`click`, () => {
      removeClassActivePin();
      pinElement.classList.add(`map__pin--active`);
      window.card.createCard(window.card.getCard(pinData));
    });

    return pinElement;
  };

  const renderPins = (pinsData) => {
    const pinFragment = document.createDocumentFragment();
    const count = pinsData.length < MAX_PINS ? pinsData.length : MAX_PINS;

    for (let i = 0; i < count; i++) {
      pinFragment.appendChild(getPin(pinsData[i]));
    }

    document.querySelector(`.map__pins`).append(pinFragment);
  };

  const successHandler = (pinsData) => {
    PINS = pinsData;
    renderPins(pinsData);
  };

  const removePins = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    if (pins) {
      pins.forEach((pin) => {
        pin.remove();
      });
    }
  };

  window.pins = {
    successHandler,
    removePins,
    getPin,
    renderPins,
    getPins
  };
})();
