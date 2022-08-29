import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

const humanizePointTime = (date) => dayjs(date).format('HH:mm');
const dateAndTime = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');

const getEventTitle = (destination, pointType) => {
  const destinationName = destination.name;
  const eventType = pointType.charAt(0).toUpperCase() + pointType.slice(1);
  return `${eventType} ${destinationName}`;
};

const getDestinationById = (destinations, id) => destinations.find((destination) => destination.id === id);

const getAvailableOffersByType = (offersByType, pointType) => offersByType.find((e) => e.type === pointType).offers;

const getOfferById = (offersByType, pointType, offerId) => getAvailableOffersByType(offersByType, pointType).find((e) => e.id === offerId);

const getSelectedOfferIds = (offersByPoint, pointType) => getAvailableOffersByType(offersByPoint, pointType).filter((e) => e.id % 2 === 0).map((e) => e.id);

export {getRandomValue, getRandomInteger, humanizePointTime, dateAndTime, getEventTitle, getDestinationById, getAvailableOffersByType, getSelectedOfferIds, getOfferById};
