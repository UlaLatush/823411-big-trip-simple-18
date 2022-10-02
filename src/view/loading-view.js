import AbstractView from '../framework/view/abstract-view';

const createNoPointTemplateView = () => (
  '<div class="trip-events__preloader"><hr/><hr/><hr/><hr/></div>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplateView();
  }
}
