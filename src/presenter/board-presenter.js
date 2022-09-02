import {render} from '../render.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
// import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';


export default class BoardPresenter {

  #tripList = new TripEventsListView();

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
    this.destinations = [...this.#destinationModel.destinations];
    this.offersByType = [...this.#offerModel.offersByType];

    render(new SortView(), this.#boardContainer);
    render(this.#tripList, this.#boardContainer);
    // render(new EventNewView(), this.#tripList.element);
    // render(new EventEditView(this.boardPoints[0], this.destinations, this.offersByType), this.#tripList.element);

    this.boardPoints.forEach((e) => (this.#renderPoint(e)));
  };

  #renderPoint = (point) => {
    const pointComponent = new EventView(point, this.destinations, this.offersByType);
    const editPointComponent = new EventEditView(point, this.destinations, this.offersByType);

    const replaceViewToEditForm = () => {
      this.#tripList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditFormToView = () => {
      this.#tripList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const eventRollUpBtn = pointComponent.element.querySelector('.event__rollup-btn');
    eventRollUpBtn.addEventListener('click', () => {
      replaceViewToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    const eventRollDownBtn = editPointComponent.element.querySelector('.event__rollup-btn');
    eventRollDownBtn.addEventListener('click', () => {
      replaceEditFormToView();
    });

    render(pointComponent, this.#tripList.element);
  };

}
