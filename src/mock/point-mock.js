import {POINT_TYPES, POINT_COUNT} from '../const.js';
import {getRandomValue, getRandomInteger, getSelectedOfferIds} from '../utils.js';
import {getOffersByType} from './offer-mock';
import dayjs from 'dayjs';

const generatePointType = () => getRandomValue(POINT_TYPES);

export const generatePoint = () => {

  const pointType = generatePointType();
  const nowDate = getRandomInteger(0, 1) === 1 ? dayjs().subtract(20, 'day') : dayjs().add(20, 'day');
  return ({
    basePrice: getRandomInteger(100, 500),
    dateFrom: nowDate.subtract(getRandomInteger(1, 5), 'day').subtract(getRandomInteger(1, 3), 'hour').toDate(),
    dateTo: nowDate.add(getRandomInteger(1, 5), 'day').add(getRandomInteger(1, 3), 'hour').toDate(),
    destination: getRandomInteger(1, 3),
    id: getRandomInteger(1, 5),
    offers: getSelectedOfferIds(getOffersByType(), pointType),
    type: pointType,
  });
};

export const generatePoints = () => Array.from({length: POINT_COUNT}, generatePoint);
