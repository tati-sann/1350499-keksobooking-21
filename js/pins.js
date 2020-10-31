'use strict';
(() => {
  const mapPins = window.data.getHousingInformation();

  const getPins = (pinsData) => {
    const pinFragment = document.createDocumentFragment();

    pinsData.forEach((pinData) => {
      const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
      const pinElement = pinTemplate.cloneNode(true);
      const img = pinElement.querySelector(`img`);

      pinElement.style.left = `${pinData.location.x - img.width / 2}px`;
      pinElement.style.top = `${pinData.location.y - img.height}px`;
      img.src = pinData.author.avatar;
      img.alt = pinData.offer.title;

      pinFragment.append(pinElement);

      pinElement.addEventListener(`click`, () => {
        window.card.createCard(window.card.getCard(pinData));
      });
    });

    return pinFragment;
  };

  const createPins = () => {
    window.map.placePins.append(getPins(mapPins));
  };

  window.pins = {
    createPins
  };
})();
