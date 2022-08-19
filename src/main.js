import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripEventsContainer = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();

render(new FiltersView(), tripControlsFilters);
boardPresenter.init(tripEventsContainer);
