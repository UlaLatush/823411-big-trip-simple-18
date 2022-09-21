import {dateAndTime, getDestinationById, getAvailableOffersByType, getDestinationIdByName} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {POINT_TYPES} from '../mock/const.js';


const createEventEditTemplate = (point, destinations, offersByType) => {

  const {dateFrom, dateTo, destination, basePrice, type, offers} = point;

  const destinationObj = getDestinationById(destinations, destination);
  const destinationName = destinationObj.name;
  const availableOffers = getAvailableOffersByType(offersByType, type);

  const dateFromTime = dateAndTime(dateFrom);
  const dateToTime = dateAndTime(dateTo);
  const descriptionText = destinationObj.description;
  const pictures = destinationObj.pictures;

  const eventTypeTemplate = (pointType, checked) => `<div class="event__type-item">
    <input id="event-type-${pointType}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${pointType}" ${checked ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${pointType}" for="event-type-${pointType}">${pointType}</label>
  </div>`;

  const eventTypeListTemplate = (types, pointType) => {
    const typesTemplate = types.map((item) => eventTypeTemplate(item, item === pointType)).join('');
    const icon = pointType ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">` : '';

    return (`<div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        ${icon}
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typesTemplate}
        </fieldset>
      </div>
    </div>`
    );
  };

  const destinationTemplate = (name) => `<option value="${name}"></option>`;

  const destinationListTemplate = (pointType) => {
    const destinationsTemplate = destinations.map((item) => destinationTemplate(item.name)).join('');
    return (`<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${pointType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
      <datalist id="destination-list-1">
       ${destinationsTemplate}
      </datalist>
    </div>`);
  };


  const offersList = availableOffers.map(({id, title, price}) => {

    const offerName = title.split(' ').pop();
    const checked = offers.find((e) => e === id) ? 'checked' : '';

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" ${checked}>
        <label class="event__offer-label" for="event-offer-${offerName}-1">
          <span class="event__offer-title">${title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>
    `);
  }).join('');

  return (`
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">

    ${eventTypeListTemplate(POINT_TYPES, type)}

    ${destinationListTemplate(type)}


    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToTime}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">

        ${offersList}

      </div>
    </section>
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${descriptionText}</p>
      <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
          </div>
        </div>
    </section>
  </section>
</form>
</li>
`);
};


export default class EventEditView extends AbstractStatefulView {

  constructor(point, destinations, offersByType) {
    super();
    this._state = EventEditView.parsePointToState(point);
    this.point = point;
    this.destinations = destinations;
    this.offersByType = offersByType;
    this.#setChangePointType();
    this.#setChangeDestination();
  }

  get template() {
    return createEventEditTemplate(this._state, this.destinations, this.offersByType);
  }

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => ({...state});

  #setChangePointType = () => {
    this.element.querySelectorAll('.event__type-input').forEach((element) => element.addEventListener('click', this.#selectPointTypeHandler));
  };

  #selectPointTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #setChangeDestination = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#selectDestinationHandler);
  };

  #selectDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: getDestinationIdByName(this.destinations, evt.target.value),
    });
  };

  setClosePointHandler = (callback) => {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closePointHandler);
  };

  #closePointHandler = (evt) => {
    evt.preventDefault();
    this.updateElement(this.point);
    this._callback.close();
  };

  setSavePointHandler = (callback) => {
    this._callback.save = callback;
    this.element.addEventListener('submit', this.#savePointHandler);
  };

  #savePointHandler = (evt) => {
    evt.preventDefault();
    this._callback.save(EventEditView.parseStateToPoint(this._state));
  };

  setDeletePointHandler = (callback) => {
    this._callback.delete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deletePointHandler);
  };

  #deletePointHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete();
  };

  _restoreHandlers = () => {
    this.#setChangePointType();
    this.setClosePointHandler(this._callback.close);
    this.setSavePointHandler(this._callback.save);
    this.setDeletePointHandler(this._callback.delete);
    this.#setChangeDestination();
  };
}
