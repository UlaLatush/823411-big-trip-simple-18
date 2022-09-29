const POINT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in', 'sightseeing','restaurant'];

const POINT_COUNT = 4;

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const FilterType = {
  everything: 'everything',
  future: 'future',
  past: 'past'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export {POINT_TYPES, POINT_COUNT, SortType, UpdateType, UserAction, FilterType};
