import YAML from 'yaml';
import { DATA_TYPE } from './constants.js';

export default (data, type) => {
  switch (type) {
    case DATA_TYPE.JSON:
      return JSON.parse(data);
    case DATA_TYPE.YAML:
      return YAML.parse(data);
    default:
      throw new Error('[FILENAME]: given unknown file type');
  }
};
