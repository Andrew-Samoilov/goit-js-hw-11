import './sass/main.scss';
import imgApi from './js/fetch-images';
import { fetchImages } from './js/fetch-images';
import { resetPageNumber } from './js/fetch-images';
const axios = require('axios').default;
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import imageTpl from './templates/image.hbs';
import getRefs from './js/get-refs';
// Notiflix.Notify.info(`Hi from Notify.`,);

const refs = getRefs();

refs.btnLoadMore.hidden = true;
refs.imgForm.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

// window.addEventListener('scroll', onScroll);

function onFormSubmit(evt) {
    evt.preventDefault();
    resetPageNumber();

    fetchImages(refs.imgField.value)
        .then(renderImages)
        .catch(onFetchError);

    refs.btnLoadMore.hidden = false;
}

function onFetchError(error) {
    console.error('!!!', error);
    Notiflix.Notify.failure(`Oops, ${error}`);
}

function renderImages(images) {
    console.log(` inside function render images`, images);  // console.log(images.hits[0].id);
    if (!images.total) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        refs.btnLoadMore.hidden = true;
        refs.imgGallery.innerHTML = '';
        return;
    } else if (images.total > 1) {
        Notiflix.Notify.info(`Hooray! We found ${images.total} images.`);
        refs.btnLoadMore.hidden = false;
    }

    if (images.total < 40) {
        refs.btnLoadMore.hidden = true;
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
    }

    const markup = [];
    for (let index = 0; index < images.hits.length; index++) {
        const element = images.hits[index];
        markup.push(imageTpl(element));
    }

    refs.imgGallery.innerHTML += markup.join('');
}

function onLoadMore() {
    console.log(` inside function load more `);
    refs.btnLoadMore.hidden = true;

    fetchImages(refs.imgField.value)
        .then(renderImages)
        .catch(onFetchError);
    // .finally(() => Notiflix.Notify.info(`Hooray! We found ${images.hits[0].id} images.`));

}

// function onScroll() {
//     // console.log(`inside function onScroll ${window.scrollY}`);
//     const gal = refs.imgGallery;
//     // console.log(`.window.scrollY ${window.scrollY} innerHeight ${window.innerHeight} gal.clientHeight ${gal.clientHeight} gal.scrollHeight ${gal.scrollHeight}`);
//     if (window.scrollY + window.innerHeight >= gal.scrollHeight) {
//         console.log(`load more`);
//         // element.scrollHeight - element.scrollTop === element.clientHeight

//         fetchImages(refs.imgField.value)
//             .then(renderImages)
//             .catch(onFetchError)
//             .finally(() => Notiflix.Notify.info(` ${pageGallery} loading`));
//     }
//     // console.log(`gal.scrollTop ${gal.scrollTop}`);
// }