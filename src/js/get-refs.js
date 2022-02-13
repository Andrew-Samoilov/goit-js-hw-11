export default function getRefs() {
  return {
    imgForm: document.querySelector('#search-form'),
    imgField: document.querySelector('input[name="searchQuery"]'),
    imgGallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),

  };
}
