import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';


const tripEventsContainer = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const pointModel = new PointModel();
const filterModel = new FilterModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const boardPresenter = new BoardPresenter();
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointModel);

filterPresenter.init();
boardPresenter.init(tripEventsContainer, tripMainElement, pointModel, destinationModel, offerModel, filterModel);
