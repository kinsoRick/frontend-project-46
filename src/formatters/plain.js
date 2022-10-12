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
  const plainTree = tree.map((node) => {
    const { key, type, value } = node;
    const property = prop + key;

    switch (type) {
      case ADDED:
        return `Property '${property}' was added with value: ${getValue(value)}`;
      case REMOVED:
        return `Property '${property}' was removed`;
      case CHANGED:
        return `Property '${property}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}`;
      case UNCHANGED:
        return [];
      case NESTED:
        return `${plain(node.children, `${property}.`)}`;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return plainTree.flatMap((str) => str).join('\n');
};

export default (tree) => plain(tree);
