import { test, expect, describe } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getDataFromFile, resolvePath } from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('helpers Tests', () => {
  test('resolvePath()', () => {
    expect(resolvePath('./__fixtures__/file1.json'))
      .toEqual(getFixturePath('file1.json'));
    expect(resolvePath('./'))
      .toEqual(process.cwd());
  });

  test('getDataFromFile()', () => {
    expect(getDataFromFile(resolvePath('./__fixtures__/nested1.json'), { encoding: 'utf8', flag: 'r' }))
      .toEqual(getDataFromFile(getFixturePath('./results/helpers.result.txt')));
  });
});
