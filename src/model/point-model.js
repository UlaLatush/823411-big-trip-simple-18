import {generatePoints} from '../mock/point-mock.js';
import {getDestinationById} from '../mock/destination-mock.js';
import {getOfferById, getOffers} from '../mock/offer-mock.js';

export default class PointModel {
  getPoints() {
    const points = generatePoints();

    return points.map((point) => ({
      ...point,
      destination: getDestinationById(point.destination),
      offers: point.offers.map((offer) => { return getOfferById(offer); }),
      allOffers: getOffers()
    }));
  }
}
