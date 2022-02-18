import './sass/main.scss';
import { fetchImages } from './js/fetch-images';
const axios = require('axios').default;
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import imageTpl from './templates/image.hbs';
import getRefs from './js/get-refs';
const refs = getRefs();

Notiflix.Notify.info(`Hi from Notify.`,);

refs.imgForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();

    // let imgForSearch = refs.imgField.value;
    let imgForSearch = 'yellow+flowers';

    fetchImages(imgForSearch)
        .then(renderImages)
        .catch(onFetchError)
        .finally(() => Notiflix.Notify.info(`finalize it`));
}

function onFetchError(error) {
    console.error('!!!', error);
    Notiflix.Notify.failure(`Oops, ${error}`);
}

function renderImages(images) {
    console.log(` inside function render images `);
    console.log(images.hits[0].id);
    if (images.total) Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);

    refs.imgGallery.innerHTML = '';
    const markup = [];
    for (let index = 0; index < images.hits.length; index++) {
        const element = images.hits[index];
        markup.push(imageTpl(element));
    }

    refs.imgGallery.innerHTML = markup.join('');
}
