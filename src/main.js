import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn
} from './js/render-functions.js';

iziToast.settings({
  timeout: 3000,
  resetOnHover: true,
  position: 'topRight',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
});

const searchForm = document.querySelector('.form');
const searchInputName = 'search-text';
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let perPage = 15;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements[searchInputName].value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    event.target.reset();
    return;
  }

  clearGallery();

  currentQuery = query;
  currentPage = 1;

  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    hideLoader();
    totalHits = data.totalHits;

    if (data.hits && data.hits.length > 0) {
      perPage = data.hits.length;
    }

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      event.target.reset();
      return;
    }

    createGallery(data.hits);

    const loadedImages = currentPage * perPage;

    if (loadedImages < totalHits) {
      showLoadMoreBtn();
      iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images!`,
      });
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    hideLoader();
    console.error(error.message);
    iziToast.error({
      title: 'Request Failed',
      message: `An error occurred: ${error.message}`,
    });
  } finally {
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    hideLoader();

    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
      });
    }

    const loadedImages = currentPage * perPage;

    if (loadedImages < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    hideLoader();
    console.error(error.message);
    iziToast.error({
      title: 'Request Failed',
      message: `An error occurred: ${error.message}`,
    });
  }
});