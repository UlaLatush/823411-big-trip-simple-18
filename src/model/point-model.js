import {generatePoints} from '../mock/point-mock.js';

export default class PointModel {

  #point = generatePoints();

  get point() {
    return this.#point;
  }
}
