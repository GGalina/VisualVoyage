import {galleryEl } from './index';
export { displaySearchList, slider };
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function displaySearchList(data) {
    const result = data.map(card =>
        `<a class="gallery__item" href="${card.largeImageURL}">
        <div class="photo-card">
            <img class="gallery__image" src=${card.webformatURL} alt="" title="${card.tags}"/>
  
        <div class="info">
            <p class="info-item">
            <b>Likes: </b>${card.likes}
            </p>

            <p class="info-item">
            <b>Views: </b>${card.views}
            </p>

            <p class="info-item">
            <b>Comments: </b>${card.comments}
            </p>

            <p class="info-item">
            <b>Downloads: </b>${card.downloads}
            </p>
        </div>
        </div>
        </a>`
    ).join('');
    return galleryEl.insertAdjacentHTML('beforeend', result);
}
const slider = new SimpleLightbox('.gallery__item', { captions:true, captionSelector:'img', captionType:'attr', captionsData: 'alt', captionDelay: 250});
