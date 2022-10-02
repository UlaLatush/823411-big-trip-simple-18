import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service';

const AUTHORISATION = 'Basic UT6qaDpKzeF9wm3c';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';


const tripEventsContainer = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORISATION));
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter();
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointModel);

filterPresenter.init();
boardPresenter.init(tripEventsContainer, tripMainElement, pointModel, filterModel);
pointModel.init();
