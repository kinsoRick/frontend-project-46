import {
  ADDED, CHANGED, NESTED, REMOVED, UNCHANGED,
} from '../constants.js';

const getIndent = (depth) => '  '.repeat((depth * 2) - 2);

const stringify = (obj, depth) => {
  const indent = getIndent(depth + 1);

  if (obj instanceof Object) {
    const objectsToString = [];
    Object.entries(obj).forEach(([key, value]) => {
      objectsToString.push(`${indent}    ${key}: ${stringify(value, depth + 1)}\n`);
    });
    return `{\n${objectsToString.join('')}${indent}}`;
  }
  return obj;
};

const stylish = (tree, depth) => {
  const indent = getIndent(depth);
  const stylishTree = [];
  tree.forEach((node) => {
    const { key, type, value } = node;

    switch (type) {
      case ADDED:
        stylishTree.push(`\n${indent}  + ${key}: ${stringify(value, depth)}`);
        break;
      case REMOVED:
        stylishTree.push(`\n${indent}  - ${key}: ${stringify(value, depth)}`);
        break;
      case UNCHANGED:
        stylishTree.push(`\n${indent}    ${key}: ${stringify(value, depth)}`);
        break;
      case CHANGED:
        stylishTree.push(`\n${indent}  - ${key}: ${stringify(value.old, depth)}`);
        stylishTree.push(`\n${indent}  + ${key}: ${stringify(value.new, depth)}`);
        break;
      case NESTED:
        stylishTree.push(`\n${indent}    ${key}: {${stylish(node.children, depth + 1)}\n${getIndent(depth + 1)}}`);
        break;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return stylishTree.join('');
};

export default (tree) => `{${stylish(tree, 1)}\n}`;
