import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
       <input
         id="filter-${name}"
         class="trip-filters__filter-input visually-hidden"
         type="radio"
         name="trip-filter"
         value="${type}"
         ${type === currentFilterType ? 'checked' : ''}
         ${count === 0 ? 'disabled' : ''}/>
       <label
         class ="trip-filters__filter-label"
         for="filter-${name}">${name}
       </label>
      </div>`
  );
};

const createFiltersTemplate = (filters, currentFilterType) => {

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return ('' +
    '<form class="trip-filters" action="#" method="get">' +
      `${filterItemsTemplate}` +
      '<button class="visually-hidden" type="submit">Accept filter</button>' +
    '</form>'
  );
};

export default class FiltersView extends AbstractView {

  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  setChangeFilterTypeHandler = (callback) => {
    this._callback.changeFilterType = callback;
    this.element.addEventListener('change', this.#changeFilterTypeHandler);
  };

  #changeFilterTypeHandler = (evt) => {
    evt.preventDefault();
    this._callback.changeFilterType(evt.target.value);
  };

}
