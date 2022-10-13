import {
  TYPE,
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
  const twoSpacesBefore = '  ';
  const stylishTree = tree.map((node) => {
    const { key, type, value } = node;

    switch (type) {
      case TYPE.ADDED:
        return `${indent}${twoSpacesBefore}+ ${key}: ${stringify(value, depth)}`;
      case TYPE.REMOVED:
        return `${indent}${twoSpacesBefore}- ${key}: ${stringify(value, depth)}`;
      case TYPE.UNCHANGED:
        return `${indent}${twoSpacesBefore}  ${key}: ${stringify(value, depth)}`;
      case TYPE.CHANGED:
        return [`${indent}${twoSpacesBefore}- ${key}: ${stringify(value.old, depth)}`,
          `${indent}${twoSpacesBefore}+ ${key}: ${stringify(value.new, depth)}`];
      case TYPE.NESTED:
        return `${indent}${twoSpacesBefore}  ${key}: {${stylish(node.children, depth + 1)}${getIndent(depth + 1)}}`;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return `\n${stylishTree.flatMap((str) => str).join('\n')}\n`;
};

export default (tree) => `{${stylish(tree, 1)}}`;
