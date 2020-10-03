"use strict";
// module3-task1
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const PINS = 8;
const AVATAR_DIR = `img/avatars/user0`;
const TITLE = `Заголовок`;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Описание`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_X = {
  MIN: 0,
  MAX: map.offsetWidth
};
const LOCATION_Y = {
  MIN: 130,
  MAX: 630
};
const PRICE = {
  MIN: 10000,
  MAX: 100000
};
const ROOMS = {
  MIN: 1,
  MAX: 5
};

const GUESTS = {
  MIN: 0,
  MAX: 5
};

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

const generatePins = () => {
  const pinsData = [];

  for (let i = 1; i <= PINS; i++) {
    const xLocation = getRandomInt(LOCATION_X.MIN, LOCATION_X.MAX);
    const yLocation = getRandomInt(LOCATION_Y.MIN, LOCATION_Y.MAX);

    pinsData.push(
        {
          author: {
            avatar: `${AVATAR_DIR}${i}.png`,
          },
          offer: {
            title: `${TITLE} № ${i}`,
            address: `${xLocation}, ${yLocation}`,
            price: getRandomInt(PRICE.MIN, PRICE.MAX),
            type: getRandomItem(TYPE),
            rooms: getRandomInt(ROOMS.MIN, ROOMS.MAX),
            guests: getRandomInt(GUESTS.MIN, GUESTS.MAX),
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
  return pinsData;
};

const getPinsTemplate = (data) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsFragment = document.createDocumentFragment();

  data.forEach((pinData) => {
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = `${pinData.location.x - img.width / 2}px`;
    pinElement.style.top = `${pinData.location.y - img.height}px`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    pinsFragment.append(pinElement);
  });

  return pinsFragment;
};

const mapPins = generatePins();
const placePins = document.querySelector(`.map__pins`);
placePins.append(getPinsTemplate(mapPins));
