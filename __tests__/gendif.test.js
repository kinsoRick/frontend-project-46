import { test, expect, describe } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import { getDataFromFile } from '../src/helpers.js';
import { FORMAT } from '../src/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Main logic', () => {
  test.each([
    {
      file1: 'nested1.json', file2: 'nested2.json', result: './results/gendiff.json.result.txt', type: FORMAT.STYLISH,
    },
    {
      file1: 'nested1.json', file2: 'nested2.json', result: './results/gendiff.plain.result.txt', type: FORMAT.PLAIN,
    },
    {
      file1: 'nested1.json', file2: 'nested2.json', result: './results/gendiff.json_format.result.txt', type: FORMAT.JSON,
    },
    {
      file1: 'nested1.yml', file2: 'nested2.yaml', result: './results/gendiff.json.result.txt', type: FORMAT.STYLISH,
    },
  ])('gendiff($file1, $file2)', (
    {
      file1, file2, result, type,
    },
  ) => {
    expect(gendiff(
      getFixturePath(file1),
      getFixturePath(file2),
      type,
    )).toEqual(getDataFromFile(getFixturePath(result)));
  });
});
