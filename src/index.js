import format from './formatters/index.js';
import getData from './parsers.js';
import { resolvePath, isObject } from './helpers.js';
import {
  ADDED, CHANGED, NESTED, REMOVED, STYLISH, UNCHANGED,
} from './constants.js';

export const createVirtualTree = (data1, data2) => {
  let keys = Object.keys(data1).concat(Object.keys(data2));
  keys = [...new Set(keys)].sort(); // now we have non duplicated keys

  return keys.map((key) => {
    const keyExistData1 = Object.hasOwn(data1, key);
    const keyExistData2 = Object.hasOwn(data2, key);

    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: NESTED, children: createVirtualTree(data1[key], data2[key]) };
    }

    if (!keyExistData1) return { key, type: ADDED, value: data2[key] };
    if (!keyExistData2) return { key, type: REMOVED, value: data1[key] };

    if (keyExistData1 && keyExistData2) {
      if (data1[key] !== data2[key]) {
        return {
          key,
          type: CHANGED,
          value: {
            old: data1[key],
            new: data2[key],
          },
        };
      }

      return { key, type: UNCHANGED, value: data1[key] };
    }

    throw new Error('[VIRTUAL_TREE]: unknown error');
  });
};

// TODO: refactor main function
const gendiff = (filepath1, filepath2, formatName = STYLISH) => {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = getData(path1);
  const data2 = getData(path2);

  const difference = createVirtualTree(data1, data2);

  return format(formatName)(difference);
};

export default gendiff;
