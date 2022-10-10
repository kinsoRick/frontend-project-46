import YAML from 'yaml';
import path from 'path';
import { getDataFromFile } from './helpers.js';

export const getJsonData = (filepath) => JSON.parse(getDataFromFile(filepath));
export const getYamlData = (filepath) => YAML.parse(getDataFromFile(filepath));
export const getExt = (filepath) => path.extname(filepath);

export default (filepath) => {
  const ext = getExt(filepath);

  switch (ext) {
    case '.json':
      return getJsonData(filepath);
    case '.yml':
      return getYamlData(filepath);
    case '.yaml':
      return getYamlData(filepath);
    default:
      throw new Error('[FILENAME]: given unknown file type');
  }
};
