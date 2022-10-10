import { test, expect, describe } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Main logic', () => {
  test('gendiff()', () => {
    expect(gendiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    )).toEqual('{\n'
      + '  - follow: false\n'
      + '    host: hexlet.io\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - timeout: 50\n'
      + '  + timeout: 20\n'
      + '  + verbose: true\n'
      + '}');

    expect(gendiff(
      getFixturePath('file2.json'),
      getFixturePath('file1.json'),
    )).toEqual('{\n'
      + '  + follow: false\n'
      + '    host: hexlet.io\n'
      + '  + proxy: 123.234.53.22\n'
      + '  - timeout: 20\n'
      + '  + timeout: 50\n'
      + '  - verbose: true\n'
      + '}');
  });
});
