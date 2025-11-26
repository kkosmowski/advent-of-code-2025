import fs from 'node:fs';

/**
 * @param {string} filename Name of the input file.
 * @param {Object} options Additional read option.
 * @param {number | 'example'} options.puzzle Specifies id of the puzzle. Required to read the input.
 * @param {boolean} options.split Decides on whether the input should be split into lines.
 */
export default function read(filename, options) {
  let result = fs.readFileSync(`./puzzles/${options.puzzle}/${filename}`, 'utf8');

  if (options.split) {
    result = result.split('\n');

    if (result[result.length - 1] === '') {
      result.pop();
    }
  }

  return result;
}