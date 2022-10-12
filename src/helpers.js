import fs from 'fs';
import path from 'path';

export const isObject = (variable) => typeof variable === 'object' && variable !== null;
export const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);
export const getDataFromFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
