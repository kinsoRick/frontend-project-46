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
  const plainTree = [];

  tree.forEach((node) => {
    const { key, type, value } = node;
    const property = prop + key;

    switch (type) {
      case ADDED:
        plainTree.push(`Property '${property}' was added with value: ${getValue(value)}`);
        break;
      case REMOVED:
        plainTree.push(`Property '${property}' was removed`);
        break;
      case CHANGED:
        plainTree.push(`Property '${property}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}`);
        break;
      case UNCHANGED:
        break;
      case NESTED:
        plainTree.push(`${plain(node.children, `${property}.`)}`);
        break;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return plainTree.join('\n');
};

export default (tree) => plain(tree); // removing last \n in string;
