import { isObject } from '../helpers.js';
import {
  TYPE,
} from '../constants.js';

const getValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (isObject(value)) return '[complex value]';
  return value;
};

const plain = (tree, prop = '') => {
  const plainTree = tree.map((node) => {
    const { key, type, value } = node;
    const property = prop + key;

    switch (type) {
      case TYPE.ADDED:
        return `Property '${property}' was added with value: ${getValue(value)}`;
      case TYPE.REMOVED:
        return `Property '${property}' was removed`;
      case TYPE.CHANGED:
        return `Property '${property}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}`;
      case TYPE.UNCHANGED:
        return [];
      case TYPE.NESTED:
        return `${plain(node.children, `${property}.`)}`;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return plainTree.flatMap((str) => str).join('\n');
};

export default (tree) => plain(tree);
