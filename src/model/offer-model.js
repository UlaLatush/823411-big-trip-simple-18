import {getOffersByType} from '../mock/offer-mock.js';

export default class OfferModel {

  #offersByType = getOffersByType();

  get offersByType() {
    return this.#offersByType;
  }
}


