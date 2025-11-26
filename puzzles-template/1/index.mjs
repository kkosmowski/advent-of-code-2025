import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 1, split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle1();

  console.log(puzzle.partA());
  // console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle1 {
  #data;

  #read() {
    this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options);
    // this.#data = read(inputLg, options);
    // this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const something = this.#a.getSomething();

    // return result;
    return 'yo makefile'
  }

  #a = {
    getSomething: (data) => {

    },
  }

  // ----------

  partB() {
    this.#read();

    const something = this.#b.getSomething();

    // return result;
  }

  #b = {
    getSomething: (data) => {

    },
  }
}

result();
