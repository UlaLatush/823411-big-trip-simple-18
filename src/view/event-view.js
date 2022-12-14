import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointTime, getEventTitle, getDestinationById, getOfferById} from '../utils.js';

const createEventViewTemplate = (point, destinations, offersByType) => {

  const {dateFrom, dateTo, destination, basePrice, type, offers} = point;

  const destinationObj = getDestinationById(destinations, destination);


  const eventTitle = getEventTitle(destinationObj, type);
  const dateFromDayMonth = humanizePointDate(dateFrom);
  const dateFromTime = humanizePointTime(dateFrom);
  const dateToTime = humanizePointTime(dateTo);

  let offersList = '<li class="event__offer">\n' +
    ' <span class="event__offer-title">No additional offers</span>';

  if (offers.length > 0) {
    offersList = offers.map((offerId) => {
      const offerObj = getOfferById(offersByType, type, offerId);
      const title = offerObj.title;
      const price = offerObj.price;
      return (`<li class="event__offer">
        <span class="event__offer-title">${title}</span>&plus; &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`);
    }).join('');
  }

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${dateFromDayMonth}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">${dateFromTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T16:05">${dateToTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">

            ${offersList}

        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class EventView extends AbstractView {

  constructor(point, destinations, offersByType) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offersByType = offersByType;
  }

  get template() {
    return createEventViewTemplate(this.point, this.destinations, this.offersByType);
  }

  setEditPointHandler = (callback) => {
    this._callback.edit = callback;
    this.element.addEventListener('click', this.#editPointHandler);
  };

  #editPointHandler = (evt) => {
    evt.preventDefault();
    this._callback.edit();
  };
}
