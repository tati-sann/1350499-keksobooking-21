'use strict';
const mainPin = document.querySelector(`.map__pin--main`);
// disactivate page
const disactivatePage = () => {
  window.map.disableMap();
  window.form.disableForm();
  window.form.disableFieldset();
  window.mainPin.setAddress();
};
disactivatePage();

// active page
const activatePage = () => {
  window.map.enableMap();
  window.form.enableFieldset();
  window.form.enableForm();
  window.mainPin.setAddress();
  window.form.validateForm();
  window.pins.createPins();
};

const mainPinRemoveEventListener = () => {
  mainPin.removeEventListener(`mousedown`, activatePageOnMouse);
  mainPin.removeEventListener(`keydown`, activatePageOnEnter);
};

const mainPinAddEventListener = () => {
  mainPin.addEventListener(`mousedown`, activatePageOnMouse);
  mainPin.addEventListener(`keydown`, activatePageOnEnter);
};

const activatePageOnMouse = (evt) => {
  window.util.isMouseButtonLeftEvent(evt, activatePage);
  mainPinRemoveEventListener();
};

const activatePageOnEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
  mainPinRemoveEventListener();
};

mainPinAddEventListener();
