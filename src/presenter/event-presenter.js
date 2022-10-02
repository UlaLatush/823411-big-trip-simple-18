import {render, remove} from '../render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class EventPresenter {

  #tripList = null;
  #point = null;
  #destinations = null;
  #offersByType = null;
  #prevPointComponent = null;
  #prevEditPointComponent = null;
  #openedViews = [];

  #changeData = null;

  constructor(tripList, destinations, offersByType, changeData) {
    this.#tripList = tripList;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;
    this.#renderPoint(point);
  };

  clear = () => {
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

    editPointComponent.setSavePointHandler((update) => {
      replaceEditFormToView();
      clearPrevComponents();
      this.#changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update
      );
    });

    editPointComponent.setDeletePointHandler((update) => {
      replaceEditFormToView();
      clearPrevComponents();
      this.#changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        update
      );
    });

    render(pointComponent, this.#tripList.element);
  };
}
