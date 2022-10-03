import {render, remove} from '../render.js';
import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view';
import EmptyListView from '../view/empty-list-view';
import LoadingView from '../view/loading-view';
import EventPresenter from './event-presenter';
import EventNewPresenter from './event-new-presenter';
import EventNewButtonView from '../view/event-new-button-view.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortByPrice, sortByDate, filter} from '../utils.js';
import {RenderPosition} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {

  #boardContainer = null;
  #boardMainElement = null;
  #pointModel = null;
  #filterModel = null;

  #tripList = new TripEventsListView();
  #sortComponent = null;
  #emptyListComponent = null;
  #loadingComponent = new LoadingView();

  #eventNewButtonComponent = null;

  #filterType = FilterType.all;
  #currentSortType = SortType.DAY;
  #eventPresenter = null;
  #eventNewPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  init = (boardContainer, boardMainElement, pointModel, filterModel) => {

    this.#boardContainer = boardContainer;
    this.#boardMainElement = boardMainElement;

    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#eventNewButtonComponent = new EventNewButtonView();

    this.#eventNewPresenter = new EventNewPresenter(this.#tripList, this.#handleViewAction, this.#eventNewButtonComponent);

    this.#renderBoard();
    this.#renderEventNewButton();
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        sortByDate(filteredPoints);
        break;
      case SortType.PRICE:
        sortByPrice(filteredPoints);
        break;
    }
    return filteredPoints;
  }

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.all);
    this.#eventNewPresenter.init(this.#pointModel.destinations, this.#pointModel.offers);
  };

  #handleViewAction = async (actionType, updateType, point) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPresenter.setSaving(point.id);
        try {
          await this.#pointModel.updatePoint(updateType, point);
        } catch(err) {
          this.#eventPresenter.setAborting(point.id);
        }
        break;
      case UserAction.ADD_POINT:
        this.#eventNewPresenter.setSaving();
        try {
          await this.#pointModel.createPoint(updateType, point);
        } catch(err) {
          this.#eventNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#eventPresenter.setDeleting(point.id);
        try {
          await this.#pointModel.deletePoint(updateType, point);
        } catch(err) {
          this.#eventPresenter.setAborting(point.id);
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#renderPoint(point);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderEventNewButton();
        break;
    }
  };

  #handlerSortTypeChange = (sortType) => {
    if (sortType === undefined || this.#currentSortType === sortType ) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard = ({resetSortType = false} = {}) => {

    // remove components from board
    remove(this.#sortComponent);
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    // clear components in child presenters
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.clear();

    // set sort type to default
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    // represent empty trip list
    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    // represent sort toolbox
    this.#renderSort();
    render(this.#tripList, this.#boardContainer);

    // represent trip list
    this.#renderPoints();
  };

  #renderEventNewButton = () => {
    if (this.#isLoading) {
      this.#eventNewButtonComponent.disable();
    } else {
      this.#eventNewButtonComponent.enable();
      this.#eventNewButtonComponent.setClickHandler(this.createPoint);
    }

    render(this.#eventNewButtonComponent, this.#boardMainElement);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#boardContainer);
  };

  #renderPoints = () => {
    this.#eventPresenter = new EventPresenter(this.#tripList, this.#pointModel.destinations, this.#pointModel.offers, this.#handleViewAction);
    this.points.forEach((e) => (this.#renderPoint(e)));
  };

  #renderPoint = (point) => {
    this.#eventPresenter.init(point);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripList.element, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#boardContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };
}
