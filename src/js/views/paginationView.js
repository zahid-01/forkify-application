import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(this._data.result.length / this._data.resultsPP);
    // 1. First page is loaded and there are more pages
    if (this._data.page === 1 && numPages > 1) {
      return this._nxtBtnMarkupGenerator();
    }
    // 2. Last page is loaded
    if (this._data.page === numPages && numPages > 1) {
      return this._prevBtnMarkupGenerator();
    }
    // 3. just a single page
    if (numPages === 1) {
      return '';
    }
    // 4. Other
    return `${this._prevBtnMarkupGenerator()}${this._nxtBtnMarkupGenerator()}`;
  }

  _prevBtnMarkupGenerator() {
    return `
    <button  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
    </button>
  
    `;
  }
  _nxtBtnMarkupGenerator() {
    return `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }

  addHandlerPage(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (e.target.closest('.pagination__btn--next')) {
        handler(1);
      }
    });

    this._parentEl.addEventListener('click', function (e) {
      if (e.target.closest('.pagination__btn--prev')) {
        handler(-1);
      }
    });
  }
}
export default new PaginationView();
