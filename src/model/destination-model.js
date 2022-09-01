import {getDestinations} from '../mock/destination-mock.js';

export default class DestinationModel {

  #destinations = getDestinations();

  get destinations() {
    return this.#destinations;
  }
}
