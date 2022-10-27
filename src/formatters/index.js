import { FORMAT } from '../constants.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const format = (formatName, tree) => {
  switch (formatName) {
    case FORMAT.STYLISH:
      return stylish(tree);
    case FORMAT.PLAIN:
      return plain(tree);
    case FORMAT.JSON:
      return json(tree);
    default:
      throw new Error('[FORMATTER]: given unknown format name');
  }
};

export default format;
