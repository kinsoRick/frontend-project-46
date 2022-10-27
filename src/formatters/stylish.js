import {
  TYPE,
} from '../constants.js';

const getIndent = (depth) => '  '.repeat((depth * 2) - 2);

const stringify = (obj, depth) => {
  const indent = getIndent(depth + 1);
  const preIndent = `${indent}    `;

  if (obj instanceof Object) {
    const objectsToString = Object.entries(obj)
      .map(([key, value]) => `${preIndent}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${objectsToString.join('\n')}\n${indent}}`;
  }
  return obj;
};

const stylish = (tree, depth) => {
  const indent = getIndent(depth);
  const preIndent = `${indent}  `;

  const stylishTree = tree.map((node) => {
    switch (node.type) {
      case TYPE.ADDED:
        return `${preIndent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case TYPE.REMOVED:
        return `${preIndent}- ${node.key}: ${stringify(node.value, depth)}`;
      case TYPE.UNCHANGED:
        return `${preIndent}  ${node.key}: ${stringify(node.value, depth)}`;
      case TYPE.CHANGED:
        return [`${preIndent}- ${node.key}: ${stringify(node.value.old, depth)}`,
          `${preIndent}+ ${node.key}: ${stringify(node.value.new, depth)}`];
      case TYPE.NESTED:
        return `${preIndent}  ${node.key}: {${stylish(node.children, depth + 1)}${getIndent(depth + 1)}}`;
      default:
        throw new Error('[FORMATTER]: given unknown type.');
    }
  });

  return `\n${stylishTree.flatMap((str) => str).join('\n')}\n`;
};

export default (tree) => `{${stylish(tree, 1)}}`;
