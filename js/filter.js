'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const VALUE_ANY = `any`;
  const Price = {
    MIN: 10000,
    MAX: 50000
  };

  const getHousingTypeFilter = (pin) => housingTypeFilter.value === VALUE_ANY ? true : pin.offer.type === housingTypeFilter.value;
  const getHousingRoomsFilter = (pin) => housingRoomsFilter.value === VALUE_ANY ? true : pin.offer.rooms === Number(housingRoomsFilter.value);
  const getHousingGuestsFilter = (pin) => housingGuestsFilter.value === VALUE_ANY ? true : pin.offer.guests === Number(housingGuestsFilter.value);
  const getHousingPriceFilter = (pin) => {
    switch (housingPriceFilter.value) {
      case (`middle`):
        return pin.offer.price >= Price.MIN && pin.offer.price <= Price.MAX;
      case (`low`):
        return pin.offer.price <= Price.MIN;
      case (`high`):
        return pin.offer.price >= Price.MAX;
      default:
        return housingPriceFilter.value === VALUE_ANY;
    }
  };
  const getHousingFeatureFilter = (pin) => {
    const houseFeature = Array.from(mapFilters.querySelectorAll(`.map__checkbox:checked`));
    return houseFeature.every((item) => {
      return pin.offer.features.includes(item.value);
    });
  };

  const filteredPins = () => {
    let pins = window.pins.getPins();
    return pins.filter((pin) => {
      let flag = true;
      if (!getHousingTypeFilter(pin)) {
        flag = false;
      }
      if (!getHousingRoomsFilter(pin)) {
        flag = false;
      }
      if (!getHousingGuestsFilter(pin)) {
        flag = false;
      }
      if (!getHousingPriceFilter(pin)) {
        flag = false;
      }
      if (!getHousingFeatureFilter(pin)) {
        flag = false;
      }
      return flag;
    });
  };

  const onFilterChange = window.debounce(() => {
    window.card.removeCard();
    window.pins.removePins();
    window.pins.renderPins(filteredPins());
  });

  const resetFilter = () => {
    mapFilters.reset();
  };

  const disableFilter = () => {
    resetFilter();
    mapFilters.removeEventListener(`change`, onFilterChange);
  };

  const enableFilter = () => {
    mapFilters.addEventListener(`change`, onFilterChange);
  };

  window.filter = {
    disableFilter,
    enableFilter
  };
})();
