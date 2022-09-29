import AbstractView from '../framework/view/abstract-view';

const createEventNewButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class EventNewButtonView extends AbstractView {

  get template() {
    return createEventNewButtonTemplate();
  }

  enable() {
    this.element.disabled = false;
  }

  disable() {
    this.element.disabled = true;
  }

  setClickHandler = (callback) => {
    this._callback.openPointAdd = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPointAdd();
  };
}
