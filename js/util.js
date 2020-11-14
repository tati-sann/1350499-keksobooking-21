'use strict';
const MOUSE_BUTTON_LEFT = 0;

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
  getDeclination,
  isEscEvent,
  isEnterEvent,
  isMouseButtonLeftEvent,
  isDocumentClickEvent
};
