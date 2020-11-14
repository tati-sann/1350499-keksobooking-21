'use strict';
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT = 5000;
const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const getRequest = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        break;
      case StatusCode.NOT_FOUND:
        error = `Cтраница не найдена`;
        break;
      case StatusCode.SERVER_ERROR:
        error = `Внутренняя ошибка сервера`;
        break;

      default:
        error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.timeout = TIMEOUT;
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  return xhr;
};

const load = (onSuccess, onError) => {
  const xhr = getRequest(onSuccess, onError);

  xhr.open(`GET`, URL_LOAD);
  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = getRequest(onSuccess, onError);

  xhr.open(`POST`, URL_UPLOAD);
  xhr.send(data);
};

window.server = {
  load,
  upload
};
