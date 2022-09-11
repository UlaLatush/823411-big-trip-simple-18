import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter';

export default class BoardPresenter {

  #tripList = new TripEventsListView();

  #boardContainer = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #eventPresenter = null;

  init = (boardContainer, pointModel, destinationModel, offerModel) => {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.boardPoints = [...this.#pointModel.points];
    this.destinations = [...this.#destinationModel.destinations];
    this.offersByType = [...this.#offerModel.offersByType];

    if (this.boardPoints.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderTripList();

      this.boardPoints.forEach((e) => (this.#renderPoint(e)));
    }
  };

  #renderPoint = (point) => {
    if(this.#eventPresenter === null ) {
      this.#eventPresenter = new EventPresenter(this.#tripList, this.destinations, this.offersByType);
    }
    this.#eventPresenter.init(point);
  }

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#boardContainer);
  };

  #renderSort = () => {
    render(new SortView(), this.#boardContainer);
  };

  #renderTripList = () => {
    render(this.#tripList, this.#boardContainer);
  }
}
