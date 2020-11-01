'use strict';
(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_POINTER_HEIGHT = 10;

  window.mainPin = {
    pin: mainPin,
    pointer: MAIN_PIN_POINTER_HEIGHT
  };
})();


