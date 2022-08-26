import {POINT_TYPES, POINT_COUNT} from './const.js';
import {getRandomValue, getRandomInteger} from '../utils.js';
import dayjs from 'dayjs';
import {getOffersByType} from './offer-mock';

const generatePointType = () => getRandomValue(POINT_TYPES);

export const generatePoint = () => {
  const pointType = generatePointType();
  return ({
    basePrice: getRandomInteger(100, 500),
    dateFrom: dayjs().subtract(getRandomInteger(1, 3), 'hour').toDate(),
    dateTo: dayjs().add(getRandomInteger(1, 3), 'hour').toDate(),
    destination: getRandomInteger(1, 3),
    id: getRandomInteger(1, 5),
    offers: getOffersByType(pointType),
    type: pointType,
  });
};

export const generatePoints = () => Array.from({length: POINT_COUNT}, generatePoint);
