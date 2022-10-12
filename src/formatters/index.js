import { PLAIN, STYLISH } from '../constants.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (formatName) => {
  switch (formatName) {
    case STYLISH:
      return stylish;
    case PLAIN:
      return plain;
    default:
      throw new Error('[FORMATTER]: given unknown format name');
  }
};

export default format;
