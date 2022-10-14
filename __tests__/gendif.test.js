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
    { file1: 'file1.yaml', file2: 'file2.yaml', result: './results/gendiff.test.result.txt' },
    { file1: 'file2.yaml', file2: 'file1.yaml', result: './results/gendiff.yaml.result.txt' },
    { file1: 'nested1.json', file2: 'nested2.json', result: './results/gendiff.json.result.txt' },
  ])('gendiff($file1, $file2)', ({ file1, file2, result }) => {
    expect(gendiff(
      getFixturePath(file1),
      getFixturePath(file2),
    )).toEqual(getDataFromFile(getFixturePath(result)));
  });

  test('gendiff() plain', () => {
    expect(gendiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
      'plain',
    )).toEqual(getDataFromFile(getFixturePath('./results/gendiff.plain.result.txt')));
  });
});
