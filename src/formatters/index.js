import { PLAIN, STYLISH, JSON_FORMAT } from '../constants.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const format = (formatName) => {
  switch (formatName) {
    case STYLISH:
      return stylish;
    case PLAIN:
      return plain;
    case JSON_FORMAT:
      return json;
    default:
      throw new Error('[FORMATTER]: given unknown format name');
  }
};

export default format;
