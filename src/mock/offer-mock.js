import {getRandomInteger} from '../utils.js';
import {POINT_TYPES} from '../mock/const.js';

const offers = [
  {
    id: 1,
    title: 'Add luggage',
    price: getRandomInteger(10, 30)
  },
  {
    id: 2,
    title: 'Choose seats',
    price: getRandomInteger(10,30)
  },
  {
    id: 3,
    title: 'Add meal',
    price: getRandomInteger(20,30)
  },
  {
    id: 4,
    title: 'Switch to comfort',
    price: getRandomInteger(10,50)
  },
  {
    id: 5,
    title: 'Travel by train',
    price: getRandomInteger(10,50)
  }
];

const offersByType = [
  {
    type: POINT_TYPES[0],
    offers: [offers[0], offers[2], offers[4]]
  },
  {
    type: POINT_TYPES[1],
    offers: [offers[0], offers[2], offers[3]]
  },
  {
    type: POINT_TYPES[2],
    offers: [offers[0], offers[4]]
  },
  {
    type: POINT_TYPES[3],
    offers: [offers[0], offers[1], offers[3], offers[4]]
  },
  {
    type: POINT_TYPES[4],
    offers: []
  },
  {
    type: POINT_TYPES[5],
    offers: [offers[0], offers[3], offers[4]]
  },
  {
    type: POINT_TYPES[6],
    offers: [offers[0], offers[1], offers[2], offers[4]]
  },
  {
    type: POINT_TYPES[7],
    offers: []
  },
  {
    type: POINT_TYPES[8],
    offers: [offers[1], offers[3], offers[4]]
  }
];

const getOffersByType = () => offersByType;

export {getOffersByType};
