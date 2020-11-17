'use strict';

const housingType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const getCard = (cardData) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardElement = cardTemplate.cloneNode(true);
  const popupClose = cardElement.querySelector(`.popup__close`);
  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const cardPhoto = cardPhotos.querySelector(`.popup__photo`);
  const cardFeatures = cardElement.querySelector(`.popup__features`);

  cardElement.querySelector(`.popup__title`).textContent = cardData.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = housingType[cardData.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} ${window.util.getDeclination(cardData.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${cardData.offer.guests} ${window.util.getDeclination(cardData.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = cardData.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = cardData.author.avatar;

  if (cardData.offer.photos) {
    cardPhotos.textContent = ``;
    cardData.offer.photos.forEach((photo) => {
      const photoElement = cardPhoto.cloneNode(true);
      photoElement.src = photo;
      cardPhotos.append(photoElement);
    });
  } else {
    cardPhotos.remove();
  }

  if (cardData.offer.features) {
    cardFeatures.textContent = ``;
    cardData.offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      cardFeatures.append(featureElement);
    });
  } else {
    cardFeatures.remove();
  }

  popupClose.addEventListener(`click`, () => {
    cardElement.remove();
  });

  return cardElement;
};

const onCardEscPress = (evt) => {
  window.util.isEscEvent(evt, closeCard);
};

const closeCard = () => {
  removeCard();
  document.removeEventListener(`keydown`, onCardEscPress);
};

const removeCard = () => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};

const createCard = (card) => {
  const filtersContainer = document.querySelector(`.map__filters-container`);
  removeCard();
  document.addEventListener(`keydown`, onCardEscPress);
  document.querySelector(`.map`).insertBefore(card, filtersContainer);
};

window.card = {
  getCard,
  createCard,
  removeCard
};
