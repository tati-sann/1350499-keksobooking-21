'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PICTURE = `img/muffin-grey.svg`;
const fileChooserAvatar = document.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const fileChooserHousingPhoto = document.querySelector(`.ad-form__upload input[type=file]`);
const previewHousingPhoto = document.querySelector(`.ad-form__photo`);
const housingPhoto = document.createElement(`img`);

const onLoadChange = (evt, cb) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader.result);
    });
    reader.readAsDataURL(file);
  }
};

const loadPreviewAvatar = (result) => {
  previewAvatar.src = result;
};

const loadPreviewHouse = (result) => {
  previewHousingPhoto.appendChild(housingPhoto);
  housingPhoto.src = result;
  housingPhoto.style.width = previewHousingPhoto.offsetWidth + `px`;
  housingPhoto.style.height = previewHousingPhoto.offsetHeight + `px`;
};

const changePreview = () => {
  fileChooserAvatar.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadPreviewAvatar);
  });

  fileChooserHousingPhoto.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadPreviewHouse);
  });
};

const resetPreview = () => {
  housingPhoto.remove();
  previewAvatar.src = DEFAULT_PICTURE;
};

window.image = {
  changePreview,
  resetPreview
};
