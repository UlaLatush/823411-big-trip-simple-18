
import {render} from '../render.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-events-list-view';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EventEditView, this.eventsList.getElement());
    render(new EventNewView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsList.getElement());
    }
  };
}


