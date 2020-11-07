'use strict';
(() => {
  const MOUSE_BUTTON_LEFT = 0;

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
  const getRandomItems = (array) => {
    const newArray = array.slice();
    for (let i = 1; i <= getRandomInt(0, array.length); i++) {
      const arrayItem = getRandomItem(newArray);
      newArray.splice(newArray.indexOf(arrayItem), 1);
    }
    return newArray;
  };
  const getDeclination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  const isMouseButtonLeftEvent = (evt, action) => {
    if (evt.button === MOUSE_BUTTON_LEFT) {
      action();
    }
  };

  const isDocumentClickEvent = (action) => {
    document.addEventListener(`click`, () => {
      action();
    });
  };

  window.util = {
    getRandomInt,
    getRandomItem,
    getRandomItems,
    getDeclination,
    isEscEvent,
    isEnterEvent,
    isMouseButtonLeftEvent,
    isDocumentClickEvent
  };
})();
