import { Command } from "commander";
import gendiff from "./index.js";

const program = new Command();

const runProgram = () => {
  // Base config
  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');

  // OPTIONS:
  program.option('-f, --format <type>', 'output format');

  // ARGUMENTS:
  program
    .argument('filepath1')
    .argument('filepath2');

  program.parse(process.argv);

  console.log(gendiff(program.args[0], program.args[1]))
}

export default runProgram;