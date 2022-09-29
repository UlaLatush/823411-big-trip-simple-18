import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../mock/const.js';

//const createEmptyListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

const NoPointsTextType = {
  [FilterType.all]: 'Click New Event to create your first point',
  [FilterType.future]: 'There are no future events now',
  [FilterType.past]: 'There are no events in the past for now'
};

const createEmptyListTemplate = (filterType) => {
  const createNoPointsText = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${createNoPointsText}</p>`;
};

export default class EmptyListView extends AbstractView{
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
