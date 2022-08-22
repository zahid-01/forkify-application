import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _id;
  _prevBtn = 1;
  _nxtBtn = 2;
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'We could not find any result for this query. Please try another recipe';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join();
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

export default new ResultsView();
