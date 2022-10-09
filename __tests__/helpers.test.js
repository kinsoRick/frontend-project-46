import { test, expect, describe } from '@jest/globals';
import { getDataFromFile, isJsonFile, resolvePath } from '../src/helpers.js';

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
      .toEqual('C:\\Projects\\frontend-project-46\\__fixtures__\\file1.json');
    expect(resolvePath('./'))
      .toEqual('C:\\Projects\\frontend-project-46');
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
