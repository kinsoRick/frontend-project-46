import {
  ADDED, CHANGED, REMOVED, UNCHANGED,
} from './constants.js';

// eslint-disable-next-line import/prefer-default-export
export const formatPlain = (tree) => {
  let formattedTree = '';
  tree.forEach((prop) => {
    const { key, type, value } = prop;

    switch (type) {
      case ADDED:
        formattedTree += `  + ${key}: ${value}\n`;
        break;
      case REMOVED:
        formattedTree += `  - ${key}: ${value}\n`;
        break;
      case UNCHANGED:
        formattedTree += `    ${key}: ${value}\n`;
        break;
      case CHANGED:
        formattedTree += `  - ${key}: ${value.old}\n`;
        formattedTree += `  + ${key}: ${value.new}\n`;
        break;
      default:
        throw new Error('[FORMATTER]: unknown type given');
    }
  });

  return `{\n${formattedTree}}`;
};
