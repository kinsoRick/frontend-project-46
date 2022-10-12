import {
  ADDED, CHANGED, NESTED, REMOVED, UNCHANGED,
} from '../constants.js';

const getIndent = (depth) => '  '.repeat((depth * 2) - 2);

const stringify = (obj, depth) => {
  const indent = getIndent(depth + 1);

  if (obj instanceof Object) {
    const objectsToString = Object.entries(obj)
      .map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);
    return `{\n${objectsToString.join('\n')}\n${indent}}`;
  }
  return obj;
};

const stylish = (tree, depth) => {
  const indent = getIndent(depth);
  const stylishTree = tree.map((node) => {
    const { key, type, value } = node;

    switch (type) {
      case ADDED:
        return `${indent}  + ${key}: ${stringify(value, depth)}`;
      case REMOVED:
        return `${indent}  - ${key}: ${stringify(value, depth)}`;
      case UNCHANGED:
        return `${indent}    ${key}: ${stringify(value, depth)}`;
      case CHANGED:
        return [`${indent}  - ${key}: ${stringify(value.old, depth)}`,
          `${indent}  + ${key}: ${stringify(value.new, depth)}`];
      case NESTED:
        return `${indent}    ${key}: {${stylish(node.children, depth + 1)}${getIndent(depth + 1)}}`;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return `\n${stylishTree.flatMap((str) => str).join('\n')}\n`;
};

export default (tree) => `{${stylish(tree, 1)}}`;
