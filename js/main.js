"use strict";
// module3-task1
const map = document.querySelector(`.map`);
// const filtersContainer = document.querySelector(`.map__filters-container`);
const placePins = document.querySelector(`.map__pins`);

const PINS_NUMBER = 8;
const AVATAR_DIR = `img/avatars/user0`;
const TITLE = `Заголовок`;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
/* const housingType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`}; */
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Описание`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LocationX = {
  MIN: 0,
  MAX: map.offsetWidth
};
const LocationY = {
  MIN: 130,
  MAX: 630
};
const Price = {
  MIN: 10000,
  MAX: 100000
};
const Rooms = {
  MIN: 1,
  MAX: 5
};

const Guests = {
  MIN: 0,
  MAX: 5
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

const getHousingInformation = () => {
  const housingData = [];

  for (let i = 1; i <= PINS_NUMBER; i++) {
    const xLocation = getRandomInt(LocationX.MIN, LocationX.MAX);
    const yLocation = getRandomInt(LocationY.MIN, LocationY.MAX);

    housingData.push(
        {
          author: {
            avatar: `${AVATAR_DIR}${i}.png`,
          },
          offer: {
            title: `${TITLE} № ${i}`,
            address: `${xLocation}, ${yLocation}`,
            price: getRandomInt(Price.MIN, Price.MAX),
            type: getRandomItem(TYPE),
            rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
            guests: getRandomInt(Guests.MIN, Guests.MAX),
            checkin: getRandomItem(CHECKS),
            checkout: getRandomItem(CHECKS),
            features: getRandomItems(FEATURES),
            description: `${DESCRIPTION} № ${i}`,
            photos: getRandomItems(PHOTOS),
          },
          location: {
            x: xLocation,
            y: yLocation,
          }
        }
    );
  }
  return housingData;
};

const getPins = (pinsData) => {
  const pinFragment = document.createDocumentFragment();

  pinsData.forEach((pinData) => {
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = `${pinData.location.x - img.width / 2}px`;
    pinElement.style.top = `${pinData.location.y - img.height}px`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    pinFragment.append(pinElement);
  });

  return pinFragment;
};

// module3-task2

// ф-йия склонения слов
// const getDeclination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];


/* const createAnnouncementCard = (cardsData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const cardPhoto = cardPhotos.querySelector(`.popup__photo`);
  const cardFeatures = cardElement.querySelector(`.popup__features`);

  cardElement.querySelector(`.popup__title`).textContent = cardsData.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = cardsData.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${cardsData.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = housingType[cardsData.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${cardsData.offer.rooms} ${getDeclination(cardsData.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${cardsData.offer.guests} ${getDeclination(cardsData.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardsData.offer.checkin}, выезд до ${cardsData.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = cardsData.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = cardsData.author.avatar;

  // photos
  if (cardsData.offer.photos) {
    cardPhotos.innerHTML = ``;
    cardsData.offer.photos.forEach((photo) => {
      const photoElement = cardPhoto.cloneNode(true);
      photoElement.src = photo;
      cardPhotos.append(photoElement);
    });
  } else {
    cardPhotos.remove();
  }

  // features
  if (cardsData.offer.features) {
    cardFeatures.innerHTML = ``;
    cardsData.offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      cardFeatures.append(featureElement);
    });
  } else {
    cardFeatures.remove();
  }

  map.insertBefore(cardElement, filtersContainer);
};

createAnnouncementCard(mapPins[0]);
 */

// module4-task1
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = adForm.querySelectorAll(`fieldset`);
const mainPin = document.querySelector(`.map__pin--main`);
const address = adForm.querySelector(`#address`);
const MAIN_PIN_POINTER_HEIGHT = 10;

// address
const getAddress = () => {
  const xLocation = Math.round(parseInt(mainPin.style.left, 10) + mainPin.clientWidth / 2);
  const yLocation = (map.classList.contains(`map--faded`)) ?
    (Math.round(parseInt(mainPin.style.top, 10) + mainPin.clientHeight / 2)) :
    (Math.round(parseInt(mainPin.style.top, 10) + mainPin.clientHeight + MAIN_PIN_POINTER_HEIGHT));

  address.value = `${xLocation}, ${yLocation}`;
};

// disactivate
const disactivatePage = () => {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  adFormFieldset.forEach((fieldset) => fieldset.setAttribute(`disabled`, `true`));
  getAddress();
};
disactivatePage();
// active
const activatePage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adFormFieldset.forEach((fieldset) => fieldset.removeAttribute(`disabled`));
  placePins.append(getPins(getHousingInformation()));
  getAddress();
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});


mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});

// validate
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const validateRooms = () => {
  const roomNumberValue = parseInt(roomNumber.value, 10);
  const capacityValue = parseInt(capacity.value, 10);

  if (roomNumberValue < capacityValue) {
    capacity.setCustomValidity(`Недопустимое количество гостей для выбранного количества комнат`);
  } else if (roomNumberValue < 100 && capacityValue === 0) {
    capacity.setCustomValidity(`Для данного количества комнат необходимо выбрать количество гостей`);
  } else if (roomNumberValue === 100 && capacityValue > 0) {
    capacity.setCustomValidity(`Выбранное количество комнат не предназначено для гостей`);
  } else {
    capacity.valid = true;
    capacity.setCustomValidity(``);
  }
};

roomNumber.addEventListener(`change`, () => {
  validateRooms();
});

capacity.addEventListener(`change`, () => {
  validateRooms();
});

validateRooms();
