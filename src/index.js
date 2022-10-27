import _ from 'lodash';
import path from 'path';
import format from './formatters/index.js';
import getData from './parsers.js';
import {
  resolvePath, isObject, getFileType, getDataFromFile,
} from './helpers.js';
import {
  TYPE, FORMAT,
} from './constants.js';

export const createVirtualTree = (data1, data2) => {
  const keys = Object.keys(data1).concat(Object.keys(data2));
  const noDuplicates = _.sortBy([...new Set(keys)]); // now we have non duplicated keys

  return noDuplicates.map((key) => {
    const keyExistData1 = Object.hasOwn(data1, key);
    const keyExistData2 = Object.hasOwn(data2, key);

    if (!keyExistData1) return { key, type: TYPE.ADDED, value: data2[key] };
    if (!keyExistData2) return { key, type: TYPE.REMOVED, value: data1[key] };

    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: TYPE.NESTED, children: createVirtualTree(data1[key], data2[key]) };
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        type: TYPE.CHANGED,
        value: {
          old: data1[key],
          new: data2[key],
        },
      };
    }

    return { key, type: TYPE.UNCHANGED, value: data1[key] };
  });
};

const gendiff = (data1, data2, formatName = FORMAT.STYLISH) => {
  const difference = createVirtualTree(data1, data2);

  return format(formatName, difference);
};

export const gendiffByFilePath = (filepath1, filepath2, formatName = FORMAT.STYLISH) => {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);
  const fileType1 = getFileType(path.extname(filepath1));
  const fileType2 = getFileType(path.extname(filepath2));

  const rawData1 = getDataFromFile(path1);
  const rawData2 = getDataFromFile(path2);
  const data1 = getData(rawData1, fileType1);
  const data2 = getData(rawData2, fileType2);

  return gendiff(data1, data2, formatName);
};

export default gendiff;
