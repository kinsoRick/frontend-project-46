import { test, expect, describe } from '@jest/globals';
import path from 'path';
import { getDataFromFile, isJsonFile, resolvePath } from '../src/helpers.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('helpers Tests', () => {
  test('isJsonFile()', () => {
    expect(isJsonFile('sadasdq.json')).toBe(true);
    expect(isJsonFile('sadasdq.json.json')).toBe(true);
    expect(isJsonFile('sadasdq.asw.jsons')).toBe(false);
    expect(isJsonFile('sadasdq.asw.js')).toBe(false);
    expect(isJsonFile('sadasdq.json.txt')).toBe(false);
  });

  test('resolvePath()', () => {
    expect(resolvePath('./__fixtures__/file1.json'))
      .toEqual(getFixturePath('file1.json'));
    expect(resolvePath('./'))
      .toEqual(process.cwd());
  });

  test('getDataFromFile()', () => {
    expect(getDataFromFile(resolvePath('./__fixtures__/file1.json'), { encoding: 'utf8', flag: 'r' }))
      .toEqual('{\n'
        + '  "host": "hexlet.io",\n'
        + '  "timeout": 50,\n'
        + '  "proxy": "123.234.53.22",\n'
        + '  "follow": false\n'
        + '}');
  });
});
