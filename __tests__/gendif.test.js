import { test, expect, describe } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import { getDataFromFile } from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Main logic', () => {
  test.each([
    { file1: 'nested1.json', file2: 'nested2.json', result: './results/gendiff.json.result.txt' },
    { file1: 'nested1.yml', file2: 'nested2.yaml', result: './results/gendiff.json.result.txt' },
  ])('gendiff($file1, $file2)', ({ file1, file2, result }) => {
    expect(gendiff(
      getFixturePath(file1),
      getFixturePath(file2),
    )).toEqual(getDataFromFile(getFixturePath(result)));
  });

  test('gendiff() plain format', () => {
    expect(gendiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
      'plain',
    )).toEqual(getDataFromFile(getFixturePath('./results/gendiff.plain.result.txt')));
  });

  test('gendiff() json format', () => {
    expect(gendiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
      'json',
    )).toEqual(getDataFromFile(getFixturePath('./results/gendiff.json_format.result.txt')));
  });
});
