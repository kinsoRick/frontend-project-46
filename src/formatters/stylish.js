import {
  ADDED, CHANGED, NESTED, REMOVED, UNCHANGED,
} from '../constants.js';

const getIndent = (depth) => '  '.repeat((depth * 2) - 2);

const stringify = (obj, depth) => {
  const indent = getIndent(depth + 1);

  if (obj instanceof Object) {
    let str = '';
    Object.entries(obj).forEach(([key, value]) => {
      str += `${indent}    ${key}: ${stringify(value, depth + 1)}\n`;
    });
    return `{\n${str}${indent}}`;
  }
  return obj;
};

const stylish = (tree, depth) => {
  const indent = getIndent(depth);
  let stylishTree = '';
  tree.forEach((node) => {
    const { key, type, value } = node;

    switch (type) {
      case ADDED:
        stylishTree += `\n${indent}  + ${key}: ${stringify(value, depth)}`;
        break;
      case REMOVED:
        stylishTree += `\n${indent}  - ${key}: ${stringify(value, depth)}`;
        break;
      case UNCHANGED:
        stylishTree += `\n${indent}    ${key}: ${stringify(value, depth)}`;
        break;
      case CHANGED:
        stylishTree += `\n${indent}  - ${key}: ${stringify(value.old, depth)}`;
        stylishTree += `\n${indent}  + ${key}: ${stringify(value.new, depth)}`;
        break;
      case NESTED:
        stylishTree += `\n${indent}    ${key}: {${stylish(node.children, depth + 1)}\n${getIndent(depth + 1)}}`;
        break;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return stylishTree;
};

export default (tree) => `{${stylish(tree, 1)}\n}`;
