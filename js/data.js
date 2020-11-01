'use strict';
(() => {
  const map = document.querySelector(`.map`); // убрать
  const PINS_NUMBER = 8;
  const AVATAR_DIR = `img/avatars/user0`;
  const TITLE = `Заголовок`;
  const TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTION = `Описание`;
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const LocationX = {
    MIN: 0,
    MAX: map.offsetWidth // map
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

  const getHousingInformation = () => {
    const housingData = [];

    for (let i = 1; i <= PINS_NUMBER; i++) {
      const xLocation = window.util.getRandomInt(LocationX.MIN, LocationX.MAX);
      const yLocation = window.util.getRandomInt(LocationY.MIN, LocationY.MAX);

      housingData.push(
          {
            author: {
              avatar: `${AVATAR_DIR}${i}.png`,
            },
            offer: {
              title: `${TITLE} № ${i}`,
              address: `${xLocation}, ${yLocation}`,
              price: window.util.getRandomInt(Price.MIN, Price.MAX),
              type: window.util.getRandomItem(TYPE),
              rooms: window.util.getRandomInt(Rooms.MIN, Rooms.MAX),
              guests: window.util.getRandomInt(Guests.MIN, Guests.MAX),
              checkin: window.util.getRandomItem(CHECKS),
              checkout: window.util.getRandomItem(CHECKS),
              features: window.util.getRandomItems(FEATURES),
              description: `${DESCRIPTION} № ${i}`,
              photos: window.util.getRandomItems(PHOTOS),
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

  window.data = {
    getHousingInformation
  };
})();
