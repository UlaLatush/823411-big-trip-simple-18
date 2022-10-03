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

  setSaving = (pointId) => {

    const editComponent = this.#getComponentByPointId(EventEditView, pointId);

    if (editComponent !== undefined) {
      editComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = (pointId) => {

    const editComponent = this.#getComponentByPointId(EventEditView, pointId);

    if (editComponent !== undefined) {
      editComponent.updateElement({
        isDisabled: true,
        isSaving: false,
        isDeleting: true,
      });
    }
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
  #getComponentByPointId = (type, pointId) => {
    const comp = this.#openedViews.find((e) => e instanceof type && e.point.id === pointId);
    return comp;
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
      this.#changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update
      );
      //replaceEditFormToView();
      clearPrevComponents();
    });

    editPointComponent.setDeletePointHandler((update) => {
      //replaceEditFormToView();
      this.#changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        update
      );
      clearPrevComponents();
    });

    render(pointComponent, this.#tripList.element);
  };
}
