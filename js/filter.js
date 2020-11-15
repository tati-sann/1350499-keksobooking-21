'use strict';
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

const getHousingTypeFilter = (type) => housingTypeFilter.value === VALUE_ANY || type === housingTypeFilter.value;
const getHousingRoomsFilter = (rooms) => housingRoomsFilter.value === VALUE_ANY || rooms === Number(housingRoomsFilter.value);
const getHousingGuestsFilter = (guests) => housingGuestsFilter.value === VALUE_ANY || guests === Number(housingGuestsFilter.value);
const getHousingPriceFilter = (price) => {
  switch (housingPriceFilter.value) {
    case (`middle`):
      return price >= Price.MIN && price <= Price.MAX;
    case (`low`):
      return price <= Price.MIN;
    case (`high`):
      return price >= Price.MAX;
    default:
      return housingPriceFilter.value === VALUE_ANY;
  }
};
const getHousingFeatureFilter = (features) => {
  return Array
    .from(mapFilters.querySelectorAll(`.map__checkbox:checked`))
    .every((item) => {
      return features.includes(item.value);
    });
};

const filteredPins = () => {
  return window.pins.getPins().filter((pin) => {
    return getHousingTypeFilter(pin.offer.type) &&
    getHousingRoomsFilter(pin.offer.rooms) &&
    getHousingGuestsFilter(pin.offer.guests) &&
    getHousingPriceFilter(pin.offer.price) &&
    getHousingFeatureFilter(pin.offer.features);
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
