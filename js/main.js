'use strict';
// page
// disactivate page
const disactivatePage = () => {
  window.map.disableMap();
  window.form.disableForm();
  window.form.disableFieldset();
  window.form.setAddress();
};
disactivatePage();

// active page
const activatePage = () => {
  window.map.enableMap();
  window.form.enableFieldset();
  window.form.enableForm();
  window.form.setAddress();
  window.pins.createPins();
  window.form.validateForm();
};

window.mainPin.pin.addEventListener(`mousedown`, (evt) => {
  window.util.isMouseButtonLeftEvent(evt, activatePage);
});


window.mainPin.pin.addEventListener(`keydown`, (evt) => {
  window.util.isEnterEvent(evt, activatePage);
});
