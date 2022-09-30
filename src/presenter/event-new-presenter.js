import {render, remove, RenderPosition} from '../render.js';
import EventEditView from '../view/event-edit-view.js';
import {UserAction, UpdateType} from '../mock/const.js';

export default class EventNewPresenter {

  #tripList = null;
  #editPointComponent = null;
  #addPointButtonComponent = null;

  #destinations = null;
  #offersByType = null;
  #changeData = null;

  constructor(tripList, destinations, offersByType, changeData, addPointButtonComponent) {
    this.#tripList = tripList;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#changeData = changeData;
    this.#addPointButtonComponent = addPointButtonComponent;
  }

  init = () => {

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EventEditView(null, this.#destinations, this.#offersByType);

    this.#editPointComponent.setSavePointHandler(this.#handleFormSubmit);
    this.#editPointComponent.setClosePointHandler(this.#handleDeleteClick);
    this.#editPointComponent.setDeletePointHandler(this.#handleDeleteClick);

    render(this.#editPointComponent, this.#tripList.element, RenderPosition.AFTERBEGIN);
    this.#addPointButtonComponent.disable();
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  destroy = () => {

    if (this.#editPointComponent === null) {
      return;
    }

    this.#addPointButtonComponent.enable();
    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
