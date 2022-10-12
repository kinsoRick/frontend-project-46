import stylish from './stylish.js';
import { STYLISH } from '../constants.js';

const format = (formatName) => {
  switch (formatName) {
    case STYLISH:
      return stylish;
    default:
      throw new Error('[FORMATTER]: given unknown format name');
  }
};

export default format;
