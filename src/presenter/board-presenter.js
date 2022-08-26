import {render} from '../render.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';


export default class BoardPresenter {
  tripList = new TripEventsListView();

  init = (boardContainer, pointModel) => {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoints = [...this.pointModel.getPoints()];

    render(new SortView(), this.boardContainer);
    render(this.tripList, this.boardContainer);
    render(new EventNewView(), this.tripList.getElement());
    render(new EventEditView(this.boardPoints[0]), this.tripList.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new EventView(this.boardPoints[i]), this.tripList.getElement());
    }

  };
}
