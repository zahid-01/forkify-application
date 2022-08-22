import View from './View';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _id;
  _prevBtn = 1;
  _nxtBtn = 2;
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'We could not find any result for this query. Please try another recipe';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join();
  }

  addHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              id === data.id ? 'preview__link--active' : ''
            }" href="#${data.id}">
            <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
            </div>  
            </a>
        </li>
    `;
  }
}

export default new bookmarksView();
