import {remove, render} from '../render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {UpdateType, UserAction} from '../const.js';

export default class EventPresenter {

  #tripList = null;
  #point = null;
  #destinations = null;
  #offersByType = null;
  #prevPointComponent = null;
  #prevEditPointComponent = null;
  #openedViews = [];
  #handleCloseNewPoint = null;

  #changeData = null;

  constructor(tripList, destinations, offersByType, changeData, handleCloseNewPoint) {
    this.#tripList = tripList;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#changeData = changeData;
    this.#handleCloseNewPoint = handleCloseNewPoint;
  }

  init = (point) => {
    this.#point = point;
    this.#renderPoint(point);
  };

  clear = () => {
    if(this.#prevEditPointComponent !== null && this.#prevPointComponent !== null) {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
    this.#openedViews.forEach((e) => (remove(e)));
  };

  setSaving = (pointId) => {

    const editComponent = this.#getComponentByPointId(EventEditView, pointId);

    if (editComponent === undefined) {
      return;
    }

    editComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setDeleting = (pointId) => {

    const editComponent = this.#getComponentByPointId(EventEditView, pointId);

    if (editComponent === undefined) {
      return;
    }

    editComponent.updateElement({
      isDisabled: true,
      isSaving: false,
      isDeleting: true,
    });
  };

  setAborting = (pointId) => {

    const editComponent = this.#getComponentByPointId(EventEditView, pointId);

    const resetFormState = () => {
      editComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    editComponent.shake(resetFormState);
  };

  /**
   * The method returns a component instance from trip-list by point identifier.
   *
   * @param type - class of component instance
   * @param pointId - identifier of rendered point
   */
  #getComponentByPointId = (type, pointId) => this.#openedViews.find((component) => component instanceof type && component.point.id === pointId);

  #clearPrevComponents = () => {
    this.#prevPointComponent = null;
    this.#prevEditPointComponent = null;
  };

  #replacePrevEditFormToView = () => {
    this.#tripList.element.replaceChild(this.#prevPointComponent.element, this.#prevEditPointComponent.element);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePrevEditFormToView();
      this.#clearPrevComponents();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #renderPoint = (point) => {

    const pointComponent = new EventView(point, this.#destinations, this.#offersByType);
    const editPointComponent = new EventEditView(point, this.#destinations, this.#offersByType);
    this.#openedViews.push(pointComponent, editPointComponent);

    const replaceViewToEditForm = () => {
      this.#tripList.element.replaceChild(editPointComponent.element, pointComponent.element);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    };

    const replaceEditFormToView = () => {
      this.#tripList.element.replaceChild(pointComponent.element, editPointComponent.element);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    };

    pointComponent.setEditPointHandler(() => {

      if(this.#prevEditPointComponent !== null && this.#prevPointComponent !== null) {
        document.removeEventListener('keydown', this.#escKeyDownHandler);
        this.#replacePrevEditFormToView();
      }

      replaceViewToEditForm();

      this.#prevPointComponent = pointComponent;
      this.#prevEditPointComponent = editPointComponent;

      this.#handleCloseNewPoint();
    });

    editPointComponent.setClosePointHandler(() => {
      replaceEditFormToView();
      this.#clearPrevComponents();
    });

    editPointComponent.setSavePointHandler((update) => {
      this.#changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update
      );
      this.#clearPrevComponents();
    });

    editPointComponent.setDeletePointHandler((update) => {
      this.#changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        update
      );
      this.#clearPrevComponents();
    });

    render(pointComponent, this.#tripList.element);
  };
}
