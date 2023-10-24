import './css/styles.css';
import fetchImgs from './fetchImgs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { displaySearchList, slider} from './displayResults';

export const { inputEl, submitBtnEl, galleryEl, loadMoreBtnEl } = {
    inputEl: document.querySelector(`#search-form`),
    submitBtnEl: document.querySelector(`[type="submit"]`),
    galleryEl: document.querySelector(`.gallery`),
    loadMoreBtnEl: document.querySelector('.load-more')
};

const searchImg = new fetchImgs();

inputEl.addEventListener(`submit`, onSearch);
loadMoreBtnEl.addEventListener(`click`, onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    loadMoreBtnEl.classList.add('is-hidden');
    galleryEl.innerHTML = '';
    searchImg.query = event.currentTarget.elements['searchQuery'].value;
    searchImg.firstPage();

    try {
        const returnedData = await searchImg.fetchData();

        if (returnedData.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        } else {
            Notify.success(`Hooray! We found ${returnedData.totalHits} images.`);
            displaySearchList(returnedData.hits);
            loadMoreBtnEl.classList.remove('is-hidden');
            slider.refresh();
        }
    }
    catch (error) {
        console.log(error)
        }
};

async function onLoadMore(event) {
    event.preventDefault();

    try {
        const returnedData = await searchImg.fetchData();
        displaySearchList(returnedData.hits);

        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
        slider.refresh();
      
        if (galleryEl.children.length === returnedData.totalHits) {
            loadMoreBtnEl.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        console.log(error);
    }
};