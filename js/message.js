'use strict';
const main = document.querySelector(`main`);

const getErrorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #a5142a;`;
  node.style.position = `absolute`;
  node.style.left = `0`;
  node.style.right = `0`;
  node.style.fontSize = `24px`;
  node.style.color = `#ed8b77`;


  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const getErrorMessage = () => {
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorButton = errorMessageTemplate.querySelector(`.error__button`);
  main.insertAdjacentElement(`afterbegin`, errorMessageTemplate);
  errorButton.addEventListener(`click`, () => {
    errorMessageTemplate.remove();
  });
  documentAddEventListener();
};

const getSuccessMessage = () => {
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  main.insertAdjacentElement(`afterbegin`, successMessageTemplate);
  documentAddEventListener();
};

const closeMessage = () => {
  removeMessage();
  documentRemoveEventListener();
};

const removeMessage = () => {
  const messageSuccess = document.querySelector(`.success`);
  const messageError = document.querySelector(`.error`);
  if (messageSuccess) {
    messageSuccess.remove();
  } else if (messageError) {
    messageError.remove();
  }
};

const onMessageEscPress = (evt) => {
  window.util.isEscEvent(evt, closeMessage);
};

const onMessageClick = () => {
  window.util.isDocumentClickEvent(closeMessage);
};

const documentAddEventListener = () => {
  document.addEventListener(`keydown`, onMessageEscPress);
  document.addEventListener(`click`, onMessageClick);
};

const documentRemoveEventListener = () => {
  document.removeEventListener(`keydown`, onMessageEscPress);
  document.removeEventListener(`click`, onMessageClick);
};


window.message = {
  getErrorHandler,
  getErrorMessage,
  getSuccessMessage
};
