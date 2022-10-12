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

    expect(gendiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
    )).toEqual(
      '{\n'
      + '    common: {\n'
      + '      + follow: false\n'
      + '        setting1: Value 1\n'
      + '      - setting2: 200\n'
      + '      - setting3: true\n'
      + '      + setting3: null\n'
      + '      + setting4: blah blah\n'
      + '      + setting5: {\n'
      + '            key5: value5\n'
      + '        }\n'
      + '        setting6: {\n'
      + '            doge: {\n'
      + '              - wow: \n'
      + '              + wow: so much\n'
      + '            }\n'
      + '            key: value\n'
      + '          + ops: vops\n'
      + '        }\n'
      + '    }\n'
      + '    group1: {\n'
      + '      - baz: bas\n'
      + '      + baz: bars\n'
      + '        foo: bar\n'
      + '      - nest: {\n'
      + '            key: value\n'
      + '        }\n'
      + '      + nest: str\n'
      + '    }\n'
      + '  - group2: {\n'
      + '        abc: 12345\n'
      + '        deep: {\n'
      + '            id: 45\n'
      + '        }\n'
      + '    }\n'
      + '  + group3: {\n'
      + '        deep: {\n'
      + '            id: {\n'
      + '                number: 45\n'
      + '            }\n'
      + '        }\n'
      + '        fee: 100500\n'
      + '    }\n'
      + '}',
    );
  });
});
