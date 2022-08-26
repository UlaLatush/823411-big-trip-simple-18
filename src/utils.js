import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// const humanizePointDate = (date) => dayjs(date).format('D MMMM');

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length-1)];

const humanizePointTime = (date) => dayjs(date).format('HH:mm');

const robotizeDate = (date) => dayjs(date).format('YYYY-MM-DD');
const robotizeDateAndTime = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');

export {getRandomValue, getRandomInteger, humanizePointTime, robotizeDateAndTime};
