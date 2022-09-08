import {render} from '../render.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EventEditView from '../view/event-edit-view.js';
import EmptyListView from '../view/empty-list-view';


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

    this.boardPoints = [...this.#pointModel.points];
    this.destinations = [...this.#destinationModel.destinations];
    this.offersByType = [...this.#offerModel.offersByType];

    if (this.boardPoints .length === 0) {
      render(new EmptyListView(), this.#boardContainer);
    } else {
      render(new SortView(), this.#boardContainer);
      render(this.#tripList, this.#boardContainer);

      this.boardPoints.forEach((e) => (this.#renderPoint(e)));
    }

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

    pointComponent.setEditPointHandler(() => {
      replaceViewToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setClosePointHandler(() => {
      replaceEditFormToView();
    });

    editPointComponent.setSavePointHandler(() => {
      replaceEditFormToView();
    });

    editPointComponent.setDeletePointHandler(() => {
      replaceEditFormToView();
    });

    render(pointComponent, this.#tripList.element);
  };

}
