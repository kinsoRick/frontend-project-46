import { FORMAT } from '../constants.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const format = (formatName) => {
  switch (formatName) {
    case FORMAT.STYLISH:
      return stylish;
    case FORMAT.PLAIN:
      return plain;
    case FORMAT.JSON:
      return json;
    default:
      throw new Error('[FORMATTER]: given unknown format name');
  }
};

export default format;
