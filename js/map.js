'use strict';
const map = document.querySelector(`.map`);

const disableMap = () => {
  map.classList.add(`map--faded`);
};

const enableMap = () => {
  map.classList.remove(`map--faded`);
};

window.map = {
  disableMap,
  enableMap
};
