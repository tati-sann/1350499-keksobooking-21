'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const MAIN_PIN_POINTER_HEIGHT = 10;
  const MAIN_PIN_HEIGHT = mainPin.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
  const MAIN_PIN_HALF_WIDTH = Math.floor(mainPin.offsetWidth / 2);
  const MainPinLocationX = {
    MIN: 0 - MAIN_PIN_HALF_WIDTH,
    MAX: map.offsetWidth - MAIN_PIN_HALF_WIDTH
  };
  const MainPinLocationY = {
    MIN: 130 - MAIN_PIN_HEIGHT,
    MAX: 630 - MAIN_PIN_HEIGHT
  };

  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let dragged = false;

    let StartCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      const Shift = {
        X: StartCoords.X - moveEvt.clientX,
        Y: StartCoords.Y - moveEvt.clientY
      };

      StartCoords = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      let mainPinY = mainPin.offsetTop - Shift.Y;
      let mainPinX = mainPin.offsetLeft - Shift.X;

      if (mainPinY <= MainPinLocationY.MIN) {
        mainPinY = MainPinLocationY.MIN;
      } else if (mainPinY >= MainPinLocationY.MAX) {
        mainPinY = MainPinLocationY.MAX;
      }

      if (mainPinX <= MainPinLocationX.MIN) {
        mainPinX = MainPinLocationX.MIN;
      } else if (mainPinX >= MainPinLocationX.MAX) {
        mainPinX = MainPinLocationX.MAX;
      }

      mainPin.style.top = `${mainPinY}px`;
      mainPin.style.left = `${mainPinX}px`;

      address.value = `${mainPinX + MAIN_PIN_HALF_WIDTH}, ${mainPinY + MAIN_PIN_HEIGHT}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const setAddress = () => {
    const xLocation = Math.round(parseInt(mainPin.style.left, 10) + mainPin.clientWidth / 2);
    const yLocation = (map.classList.contains(`map--faded`)) ?
      (Math.round(parseInt(mainPin.style.top, 10) + mainPin.clientHeight / 2)) :
      (Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT));

    address.value = `${xLocation}, ${yLocation}`;
  };

  window.mainPin = {
    setAddress
  };
})();


