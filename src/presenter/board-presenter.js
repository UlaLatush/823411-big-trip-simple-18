import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter';
import {SortType} from '../mock/const.js';
import {sortByPrice, sortByDate} from '../utils.js';

export default class BoardPresenter {

  #tripList = new TripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];
  #eventPresenter = null;
  #boardPoints = [];

  init = (boardContainer, pointModel, destinationModel, offerModel) => {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.#sourcedBoardPoints = [...this.#pointModel.points];
    this.#boardPoints = [...this.#pointModel.points];
    this.destinations = [...this.#destinationModel.destinations];
    this.offersByType = [...this.#offerModel.offersByType];

    if (this.#boardPoints.length === 0) {
      render(new EmptyListView(), this.#boardContainer);
    } else {
      this.#renderSort();
      render(this.#tripList, this.#boardContainer);

      this.#sortPoints(SortType.DEFAULT);
      this.#renderPoints();
    }
  };

  #renderPoints = () => {
    this.#boardPoints.forEach((e) => (this.#renderPoint(e)));
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        sortByDate(this.#boardPoints);
        break;
      case SortType.PRICE:
        sortByPrice(this.#boardPoints);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#eventPresenter.clearOpenedViews();
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };

  #renderPoint = (point) => {
    if(this.#eventPresenter === null ) {
      this.#eventPresenter = new EventPresenter(this.#tripList, this.destinations, this.offersByType);
    }
    this.#eventPresenter.init(point);
  };

}
