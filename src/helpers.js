import fs from 'fs';
import path from 'path';
import { DATA_TYPE } from './constants.js';

export const isObject = (variable) => typeof variable === 'object' && variable !== null && !Array.isArray(variable);
export const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);
export const getDataFromFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
export const getFileType = (ext) => {
  switch (ext) {
    case '.yaml':
    case '.yml':
      return DATA_TYPE.YAML;
    case '.json':
      return DATA_TYPE.JSON;
    default:
      throw new Error('given uknown file type!');
  }
};
