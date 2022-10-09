import { getDataFromFile, isJsonFile, resolvePath } from './helpers.js';
import {
  ADDED, CHANGED, REMOVED, UNCHANGED,
} from './constants.js';
import { formatPlain } from './formatter.js';

export const createVirtualTree = (data1, data2) => {
  let keys = Object.keys(data1).concat(Object.keys(data2));
  keys = [...new Set(keys)].sort(); // now we had non duplicated keys

  return keys.map((key) => {
    const keyExistData1 = Object.hasOwn(data1, key);
    const keyExistData2 = Object.hasOwn(data2, key);

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

export const compareJSON = (filepath1, filepath2) => {
  const fileData1 = JSON.parse(getDataFromFile(filepath1));
  const fileData2 = JSON.parse(getDataFromFile(filepath2));

  return createVirtualTree(fileData1, fileData2);
};

const gendiff = (filepath1, filepath2) => {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  if (isJsonFile(path1) && isJsonFile(path2)) {
    const difference = compareJSON(path1, path2);

    return formatPlain(difference);
  }
  return 'a';
};

export default gendiff;
