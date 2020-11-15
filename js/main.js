'use strict';
const mainPin = document.querySelector(`.map__pin--main`);
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

const disactivatePage = () => {
  window.map.disableMap();
  window.form.disableForm();
  window.mainPin.setAddress();
  window.pins.removePins();
  window.mainPin.getStartСoordinates();
  window.card.removeCard();
  window.filter.disableFilter();
  mainPinAddEventListener();
  window.image.resetPreview();
};
disactivatePage();

const activatePage = () => {
  window.map.enableMap();
  window.form.enableForm();
  window.mainPin.setAddress();
  window.server.load(window.pins.successHandler, window.message.errorHandler);
  window.filter.enableFilter();
  window.image.changePreview();
};

window.main = {
  disactivatePage
};
