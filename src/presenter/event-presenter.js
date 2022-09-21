import {render, remove} from '../render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventPresenter {

  #tripList = null;
  #point = null;
  #destinations = null;
  #offersByType = null;
  #prevPointComponent = null;
  #prevEditPointComponent = null;
  #openedViews = [];

  constructor(tripList, destinations, offersByType) {
    this.#tripList = tripList;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  init = (point) => {
    this.#point = point;
    this.#renderPoint(point);
  };

  clearOpenedViews = () => {
    this.#openedViews.forEach((e) => (remove(e)));
  };

  #renderPoint = (point) => {
    const pointComponent = new EventView(point, this.#destinations, this.#offersByType);
    const editPointComponent = new EventEditView(point, this.#destinations, this.#offersByType);
    this.#openedViews.push(pointComponent, editPointComponent);

    const replaceViewToEditForm = () => {
      this.#tripList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditFormToView = () => {
      this.#tripList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const clearPrevComponents = () => {
      this.#prevPointComponent = null;
      this.#prevEditPointComponent = null;
    };

    const replacePrevEditFormToView = () => {
      this.#tripList.element.replaceChild(this.#prevPointComponent.element, this.#prevEditPointComponent.element);
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

      if(this.#prevEditPointComponent !== null && this.#prevPointComponent !== null) {
        replacePrevEditFormToView();
      }

      this.#prevPointComponent = pointComponent;
      this.#prevEditPointComponent = editPointComponent;

      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setClosePointHandler(() => {
      replaceEditFormToView();
      clearPrevComponents();
    });

    editPointComponent.setSavePointHandler(() => {
      replaceEditFormToView();
      clearPrevComponents();
    });

    editPointComponent.setDeletePointHandler(() => {
      replaceEditFormToView();
      clearPrevComponents();
    });

    render(pointComponent, this.#tripList.element);
  };
}
