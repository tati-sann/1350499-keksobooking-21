"use strict";
// module3-task1
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const filtersContainer = document.querySelector(`.map__filters-container`);

const ELEMENTS = 8;
const AVATAR_DIR = `img/avatars/user0`;
const TITLE = `Заголовок`;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const housingType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`};
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Описание`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const locationX = {
  min: 0,
  max: map.offsetWidth
};
const locationY = {
  min: 130,
  max: 630
};
const price = {
  min: 10000,
  max: 100000
};
const rooms = {
  min: 1,
  max: 5
};

const guests = {
  min: 0,
  max: 5
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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
  const data = [];

  for (let i = 1; i <= ELEMENTS; i++) {
    const xLocation = getRandomInt(locationX.min, locationX.max);
    const yLocation = getRandomInt(locationY.min, locationY.max);

    data.push(
        {
          author: {
            avatar: `${AVATAR_DIR}${i}.png`,
          },
          offer: {
            title: `${TITLE} № ${i}`,
            address: `${xLocation}, ${yLocation}`,
            price: getRandomInt(price.min, price.max),
            type: getRandomItem(TYPE),
            rooms: getRandomInt(rooms.min, rooms.max),
            guests: getRandomInt(guests.min, guests.max),
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
  return data;
};

const getPins = (data) => {
  const pinFragment = document.createDocumentFragment();

  data.forEach((pinData) => {
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

const mapPins = getHousingInformation();
const placePins = document.querySelector(`.map__pins`);
placePins.append(getPins(mapPins));

// module3-task2

// ф-йия склонения слов
const getDecl = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];


const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const cardPhoto = cardElement.querySelector(`.popup__photo`);
  const cardFeatures = cardElement.querySelector(`.popup__features`);

  cardElement.querySelector(`.popup__title`).textContent = data.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = data.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${data.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = housingType[data.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} ${getDecl(data.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${data.offer.guests} ${getDecl(data.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = data.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = data.author.avatar;

  // photos
  while (cardPhotos.firstChild) {
    cardPhotos.removeChild(cardPhotos.firstChild);
  }
  for (let i = 0; i < data.offer.photos.length; i++) {
    const photoElement = cardPhoto.cloneNode(true);
    photoElement.src = `${data.offer.photos[i]}`;
    cardPhotos.appendChild(photoElement);
  }
  // features
  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }
  for (let i = 0; i < data.offer.features.length; i++) {
    let featureElement = document.createElement(`li`);
    featureElement.classList.add(`popup__feature`);
    featureElement.classList.add(`popup__feature--${data.offer.features[i]}`);
    cardFeatures.appendChild(featureElement);
  }

  map.insertBefore(cardElement, filtersContainer);
};

createCard(mapPins[0]);
