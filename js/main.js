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
const DESCRIPTTION = `Описание`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = map.offsetWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 0;
const MAX_GUESTS = 5;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomArray = (array) => {
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
    const xLocation = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    const yLocation = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);

    pinsData.push(
        {
          author: {
            avatar: `${AVATAR_DIR}${i}.png`,
          },
          offer: {
            title: `${TITLE} № ${i}`,
            address: xLocation + `, ` + yLocation,
            price: getRandomInt(MIN_PRICE, MAX_PRICE),
            type: getRandomItem(TYPE),
            rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
            guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomItem(CHECKS),
            chechout: getRandomItem(CHECKS),
            features: getRandomArray(FEATURES),
            description: `${DESCRIPTTION} № ${i}`,
            photos: getRandomArray(PHOTOS),
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

    pinElement.style = `left: ${pinData.location.x - img.width / 2}px; top: ${pinData.location.y - img.height}px;`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    pinsFragment.append(pinElement);
  });

  return pinsFragment;
};

const mapPins = generatePins();
const placePins = document.querySelector(`.map__pins`);
placePins.append(getPinsTemplate(mapPins));
