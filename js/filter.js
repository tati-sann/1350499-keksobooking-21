'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const VALUE_ANY = `any`;

  const getHousingTypeFilter = (pin) => {
    return housingTypeFilter.value === VALUE_ANY ? true : pin.offer.type === housingTypeFilter.value;
  };

  const filteredPins = () => {
    let pins = window.pins.getPins();
    return pins.filter((pin) => {
      let flag = true;
      if (!getHousingTypeFilter(pin)) {
        flag = false;
      }
      return flag;
    });
  };

  const onFilterChange = () => {
    window.card.removeCard();
    window.pins.removePins();
    window.pins.renderPins(filteredPins());
  };

  mapFilters.addEventListener(`change`, onFilterChange);
})();
