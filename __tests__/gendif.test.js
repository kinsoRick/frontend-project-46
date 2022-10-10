import { test, expect, describe } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Main logic', () => {
  test('gendiff() json', () => {
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

  test('gendiff() yml', () => {
    expect(gendiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
    )).toEqual('{\n'
      + '  - follow: false\n'
      + '    host: hexlet.io\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - timeout: 50\n'
      + '  + timeout: 20\n'
      + '  + verbose: true\n'
      + '}');

    expect(gendiff(
      getFixturePath('file2.yml'),
      getFixturePath('file1.yml'),
    )).toEqual('{\n'
      + '  + follow: false\n'
      + '    host: hexlet.io\n'
      + '  + proxy: 123.234.53.22\n'
      + '  - timeout: 20\n'
      + '  + timeout: 50\n'
      + '  - verbose: true\n'
      + '}');
  });

  test('gendiff() yaml', () => {
    expect(gendiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
    )).toEqual('{\n'
      + '  - follow: false\n'
      + '    host: hexlet.io\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - timeout: 50\n'
      + '  + timeout: 20\n'
      + '  + verbose: true\n'
      + '}');

    expect(gendiff(
      getFixturePath('file2.yaml'),
      getFixturePath('file1.yaml'),
    )).toEqual('{\n'
      + '  + follow: false\n'
      + '    host: hexlet.io\n'
      + '  + proxy: 123.234.53.22\n'
      + '  - timeout: 20\n'
      + '  + timeout: 50\n'
      + '  - verbose: true\n'
      + '}');

    expect(() => gendiff(
      getFixturePath('file2.yasml'),
      getFixturePath('file1.yasml'),
    )).toThrow('[FILENAME]: given unknown file type');
  });
});
