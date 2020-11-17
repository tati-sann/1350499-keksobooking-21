'use strict';
const mainPin = document.querySelector(`.map__pin--main`);
const mainPinRemoveEventListener = () => {
  mainPin.removeEventListener(`mousedown`, onPageClick);
  mainPin.removeEventListener(`keydown`, onPagePressEnter);
};

const mainPinAddEventListener = () => {
  mainPin.addEventListener(`mousedown`, onPageClick);
  mainPin.addEventListener(`keydown`, onPagePressEnter);
};

const onPageClick = (evt) => {
  window.util.isMouseButtonLeftEvent(evt, activatePage);
  mainPinRemoveEventListener();
};

const onPagePressEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
  mainPinRemoveEventListener();
};

const disactivatePage = () => {
  window.map.disableMap();
  window.form.disableForm();
  window.mainPin.setAddress();
  window.pins.removePins();
  window.mainPin.getStartCoords();
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
  window.server.load(window.pins.successHandler, window.message.getErrorHandler);
  window.filter.enableFilter();
  window.image.changePreview();
};

window.main = {
  disactivatePage
};
