'use strict';
const MAIN_PIN_POINTER_HEIGHT = 10;
const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const address = document.querySelector(`#address`);
const mainPinHeight = mainPin.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
const mainPinHalfWidth = Math.floor(mainPin.offsetWidth / 2);
const MainPinStartCoords = {
  X: 375,
  Y: 570,
};
const LimitCoordsX = {
  MIN: 0,
  MAX: map.offsetWidth
};
const LimitCoordsY = {
  MIN: 130,
  MAX: 630
};
const MainPinLocationX = {
  MIN: LimitCoordsX.MIN - mainPinHalfWidth,
  MAX: LimitCoordsX.MAX - mainPinHalfWidth
};
const MainPinLocationY = {
  MIN: LimitCoordsY.MIN - mainPinHeight,
  MAX: LimitCoordsY.MAX - mainPinHeight
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

    address.value = `${mainPinX + mainPinHalfWidth}, ${mainPinY + mainPinHeight}`;
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
    (Math.round(parseInt(mainPin.style.top, 10) + mainPinHeight));

  address.value = `${xLocation}, ${yLocation}`;
};

const getStartCoords = () => {
  mainPin.style.top = `${MainPinStartCoords.X}px`;
  mainPin.style.left = `${MainPinStartCoords.Y}px`;
};

window.mainPin = {
  setAddress,
  getStartCoords
};
