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

export {getRandomValue, getRandomInteger, humanizePointTime, dateAndTime, getEventTitle};
