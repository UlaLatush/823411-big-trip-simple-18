import {generatePoints} from '../mock/point-mock.js';
import Observable from '../framework/observable';

export default class PointModel extends Observable {

  #points = generatePoints();

  get points() {
    return this.#points;
  }

  createPoint(updateType, point) {
    this.#points = [point, ...this.#points];
    this._notify(updateType, point);
  }

  updatePoint(updateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    if(index === -1) {
      throw new Error('Item is not found');
    }

    this.#points = [...this.#points.slice(0, index), point, ...this.#points.slice(index + 1)];

    this._notify(updateType, point);
  }

  deletePoint(updateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    if(index === -1) {
      throw new Error('Item is not found');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
    this._notify(updateType, point);
  }
}
