import dayjs from 'dayjs';
import {FilterType} from './mock/const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

const humanizePointTime = (date) => dayjs(date).format('HH:mm');
const dateAndTime = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');
const humanizePointDate = (date) => dayjs(date).format('DD MMM');

const getEventTitle = (destination, pointType) => {
  const destinationName = destination.name;
  const eventType = pointType.charAt(0).toUpperCase() + pointType.slice(1);
  return `${eventType} ${destinationName}`;
};

const isFuture = (dateFrom, dateTo) => dayjs(dateFrom).isAfter(dayjs(), 'd') || dayjs(dateTo).isAfter(dayjs(), 'd')
    || dayjs(dateFrom).isSame(dayjs(), 'd') || dayjs(dateTo).isSame(dayjs(), 'd');

const isPastPoint = (dateFrom, dateTo) => dayjs(dateFrom).isBefore(dayjs(), 'd') || dayjs(dateTo).isBefore(dayjs(), 'd');

const filter = {
  [FilterType.everything]: (points) => points,
  [FilterType.past]: (points) => points.filter(({dateFrom, dateTo}) => isPastPoint(dateFrom, dateTo)),
  [FilterType.future]: (points) => points.filter(({dateFrom, dateTo}) => isFuture(dateFrom, dateTo)),
};

const sortByPrice = (points) => {
  points.sort((point1, point2) => (point1.basePrice - point2.basePrice));
};

const sortByDate = (points) => {
  points.sort((point1, point2) => dayjs(point1.dateFrom).diff(dayjs(point2.dateFrom)));
};

const sortByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

const getDestinationById = (destinations, id) => destinations.find((destination) => destination.id === id);

const getDestinationIdByName = (destinations, name) => destinations.find((destination) => destination.name === name).id;


const getAvailableOffersByType = (offersByType, pointType) => offersByType.find((e) => e.type === pointType).offers;

const getOfferById = (offersByType, pointType, offerId) => getAvailableOffersByType(offersByType, pointType).find((e) => e.id === offerId);

const getSelectedOfferIds = (offersByPoint, pointType) => getAvailableOffersByType(offersByPoint, pointType).filter((e) => e.id % 2 === 0).map((e) => e.id);

export {isFuture, isPastPoint, sortByTime, filter, getDestinationIdByName, humanizePointDate, sortByDate, sortByPrice, getRandomValue, getRandomInteger, humanizePointTime, dateAndTime, getEventTitle, getDestinationById, getAvailableOffersByType, getSelectedOfferIds, getOfferById};
