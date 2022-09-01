import {render} from '../render.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';


export default class BoardPresenter {
  tripList = new TripEventsListView();

  #boardContainer = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;


  init = (boardContainer, pointModel, destinationModel, offerModel) => {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.boardPoints = [...this.#pointModel.point];
    this.destinations = [...this.#destinationModel.getDestinations];
    this.offersByType = [...this.#offerModel.offersByType];

    render(new SortView(), this.#boardContainer);
    render(this.tripList, this.#boardContainer);
    render(new EventNewView(), this.tripList.getElement());
    render(new EventEditView(this.boardPoints[0], this.destinations, this.offersByType), this.tripList.getElement());

    this.boardPoints.slice(1).forEach((e) => render(new EventView(e, this.destinations, this.offersByType), this.tripList.getElement()));

  };
}
