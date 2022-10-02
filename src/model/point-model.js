import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class PointModel extends Observable {

  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;

    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };


  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  createPoint = (updateType, point) => {
    this.#points = [point, ...this.#points];
    this._notify(updateType, point);
  };

  updatePoint = async (updateType, point) => {
    const index = this.#points.findIndex((item) => item.id === point.id);

    if(index === -1) {
      throw new Error('Item is not found');
    }

    this.#points = [...this.#points.slice(0, index), point, ...this.#points.slice(index + 1)];

    this._notify(updateType, point);
  };

  deletePoint(updateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    if(index === -1) {
      throw new Error('Item is not found');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
    this._notify(updateType, point);
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateTo: point['date_to'] ? new Date(point['date_to']) : null,
      dateFrom: point['date_from'] ? new Date(point['date_from']) : null,
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
