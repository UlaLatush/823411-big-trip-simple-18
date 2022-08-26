import {getRandomInteger} from '../utils.js';

const generatePicture = () => `https://picsum.photos/300/200?random=${getRandomInteger(1, 5)}`;

const destinations = [
  {
    id: 1,
    description: 'It is a resort area near the junction of France.',
    name: 'Chamonix',
    pictures: [
      {
        'src': generatePicture(),
        'description': 'Chamonix parliament building'
      },
      {
        'src': generatePicture(),
        'description': 'Valley of Chamonix-Mont-Blanc'
      },
      {
        'src': generatePicture(),
        'description': 'Grand Hôtel des Alpes, Chamonix'
      },
      {
        'src': generatePicture(),
        'description': 'Chamonix city view'
      },
      {
        'src': generatePicture(),
        'description': 'Chamonie mountains'
      },
    ]
  },
  {
    id: 2,
    description: 'Port Louis is the capital city of Mauritius.',
    name: 'Port Louis',
    pictures: [
      {
        'src': generatePicture(),
        'description': 'Capital city of Mauritius'
      },
      {
        'src': generatePicture(),
        'description': 'Port Louis river'
      },
      {
        'src': generatePicture(),
        'description': 'Grand Hôtel in Port Louis'
      },
      {
        'src': generatePicture(),
        'description': 'Port Louis city view'
      },
      {
        'src': generatePicture(),
        'description': 'Port Louis mountains'
      },
    ]
  },
  {
    id: 3,
    description: 'Athens is the capital city of Greece.',
    name: 'Athens',
    pictures: [
      {
        'src': generatePicture(),
        'description': 'Athens parliament main building'
      },
      {
        'src': generatePicture(),
        'description': 'Valley of Athens'
      },
      {
        'src': generatePicture(),
        'description': 'Athens city view'
      },
      {
        'src': generatePicture(),
        'description': 'Athens acropolis'
      },
      {
        'src': generatePicture(),
        'description': 'Mountain view of Athens'
      },
    ]
  }
];

const getDestinations = () => destinations;

const getDestinationById = (id) => destinations.find(destination => { return destination.id === id; });

export {getDestinations, getDestinationById}
