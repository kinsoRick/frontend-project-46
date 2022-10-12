import {
  ADDED, CHANGED, NESTED, REMOVED, UNCHANGED,
} from '../constants.js';

const getValue = (value) => {
  if (value === null) return value;
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return value;
};

const plain = (tree, prop = '') => {
  let plainTree = '';

  tree.forEach((node) => {
    const { key, type, value } = node;
    const property = prop + key;

    switch (type) {
      case ADDED:
        plainTree += `Property '${property}' was added with value: ${getValue(value)}\n`;
        break;
      case REMOVED:
        plainTree += `Property '${property}' was removed\n`;
        break;
      case CHANGED:
        plainTree += `Property '${property}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}\n`;
        break;
      case UNCHANGED:
        plainTree += '';
        break;
      case NESTED:
        plainTree += `${plain(node.children, `${property}.`)}`;
        break;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return plainTree;
};

export default (tree) => plain(tree).slice(0, -1); // removing last \n in string;
