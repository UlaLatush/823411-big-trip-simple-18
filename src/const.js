const POINT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in', 'sightseeing','restaurant'];

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const FilterType = {
  all: 'all',
  future: 'future',
  past: 'past'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export {POINT_TYPES, SortType, UpdateType, UserAction, FilterType};
