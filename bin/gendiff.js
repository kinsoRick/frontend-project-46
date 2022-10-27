#!/usr/bin/env node
import { Command } from 'commander';
import { gendiffByFilePath } from '../src/index.js';
import { FORMAT } from '../src/constants.js';

const program = new Command();

const runProgram = () => {
  // Base config
  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');

  // OPTIONS:
  program.option('-f, --format <type>', 'output format', FORMAT.STYLISH);

  // ARGUMENTS:
  program
    .argument('filepath1')
    .argument('filepath2');

  program.action((filepath1, filepath2) => {
    console.log(gendiffByFilePath(filepath1, filepath2, program.opts().format));
  });

  program.parse(process.argv);
};

runProgram();
