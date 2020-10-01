"use strict";
// module3-task1
// удаление класса .map--faded у .map
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

// массив из 8 сгенерированных JS объектов
const PINS = 8;
// рандомное целое цисло
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// рандомный элемент
const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

// фун-ция
const generatePinsArray = () => {
  const pinsData = [];
  const avatarDir = `img/avatars/user0`;
  const title = `Заголовок`;
  const type = [`palace`, `flat`, `house`, `bungalow`];
  const checkin = [`12:00`, `13:00`, `14:00`];
  const chechout = [`12:00`, `13:00`, `14:00`];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const description = `Описание`;
  const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  for (let i = 1; i <= PINS; i++) {
    // элементы добавляем в конец массива
    pinsData.push(
        {
          author: {
            avatar: avatarDir + i + `.png`,
          },
          offer: {
            title: title + ` № ` + i,
            address: getRandomInt(0, 600) + `, ` + getRandomInt(0, 600),
            price: getRandomInt(1000, 5000),
            type: getRandomItem(type),
            rooms: getRandomInt(1, 5),
            guests: getRandomInt(2, 10),
            checkin: getRandomItem(checkin),
            chechout: getRandomItem(chechout),
            features: getRandomItem(features),
            description: description + ` № ` + i,
            photos: getRandomItem(photos),
          },
          location: {
            x: getRandomInt(0, map.offsetWidth),
            y: getRandomInt(130, 630),
          }
        }
    );
  }
  return pinsData;
};

// заполняем шаблон
const getPins = (data) => {
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

// добавляем в разметку
const mapPins = generatePinsArray();
const placePins = document.querySelector(`.map__pins`);
placePins.append(getPins(mapPins));
