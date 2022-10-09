import {ADDED, CHANGED, REMOVED, UNCHANGED} from "./constants.js";

export const formatPlain = (tree) => {
  let formattedTree = ``
  tree.map((prop) => {
    const { key, type, value } = prop;

    switch (type) {
      case ADDED:
        formattedTree += `  + ${key}: ${value}\n`
        break
      case REMOVED:
        formattedTree += `  - ${key}: ${value}\n`
        break
      case UNCHANGED:
        formattedTree += `    ${key}: ${value}\n`
        break
      case CHANGED:
        formattedTree += `  - ${key}: ${value.old}\n`
        formattedTree += `  + ${key}: ${value.new}\n`
        break
    }
  });

  return `{\n${formattedTree}}`;
};