'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const placePins = document.querySelector(`.map__pins`);
  const filtersContainer = document.querySelector(`.map__filters-container`);

  const disableMap = () => {
    map.classList.add(`map--faded`);
  };

  const enableMap = () => {
    map.classList.remove(`map--faded`);
  };

  window.map = {
    map,
    placePins,
    filtersContainer,
    disableMap,
    enableMap
  };
})();


