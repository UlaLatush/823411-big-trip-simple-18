import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';

const tripEventsContainer = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const boardPresenter = new BoardPresenter();

render(new FiltersView(), tripControlsFilters);
boardPresenter.init(tripEventsContainer, pointModel, destinationModel, offerModel);
