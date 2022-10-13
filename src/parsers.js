import YAML from 'yaml';
import path from 'path';
import { getDataFromFile } from './helpers.js';

export default (filepath) => {
  const ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(getDataFromFile(filepath));
    case '.yml':
    case '.yaml':
      return YAML.parse(getDataFromFile(filepath));
    default:
      throw new Error('[FILENAME]: given unknown file type');
  }
};
