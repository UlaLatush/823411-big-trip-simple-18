import {generatePoints} from '../mock/point-mock.js';

export default class PointModel {

  #points = generatePoints();

  get points() {
    return this.#points;
  }
}
