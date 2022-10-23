import YAML from 'yaml';
import { getDataFromFile } from './helpers.js';
import { FILE_TYPE } from './constants.js';

export default (filepath, type) => {
  switch (type) {
    case FILE_TYPE.JSON:
      return JSON.parse(getDataFromFile(filepath));
    case FILE_TYPE.YAML:
      return YAML.parse(getDataFromFile(filepath));
    default:
      throw new Error('[FILENAME]: given unknown file type');
  }
};
