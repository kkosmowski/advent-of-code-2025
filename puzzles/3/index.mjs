import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 3, split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle3();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle3 {
  #data;

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options); // custom input
    // this.#data = read(inputLg, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const joltages = this.#a.getHighestJoltages(this.#data);
    const result = this.#a.sumJoltages(joltages);

    return result;
  }

  #a = {
    /**
     * Finds the highest "joltage" for each battery
     * @param {string[]} batteries
     * @returns {number[]}
     */
    getHighestJoltages: (batteries) => {
      const joltages = [];

      for (const battery of batteries) {
        joltages.push(this.#a.findHighestJoltage(battery));
      }

      return joltages;
    },
    /**
     * Finds the highest "joltage" for single battery
     * @param {string} battery
     * @returns {number}
     */
    findHighestJoltage: (battery) => {
      const [firstValue, index] = this.#a.findHighestDigitWithIndex(battery.slice(0, battery.length - 1));
      const [lastValue] = this.#a.findHighestDigitWithIndex(battery.slice(index + 1));

      return Number(firstValue.concat(lastValue));
    },
    /**
     * Iterates through a string of digits to find the highest one. Returns max value and its index.
     * @param {string} string
     * @returns {[string, number]}
     */
    findHighestDigitWithIndex: (string) => {
      let max = 0;
      let index = 0;

      for (let i = 0; i < string.length; i++) {
        if (Number(string[i]) > max) {
          max = Number(string[i]);
          index = i;
        }
      }

      return [String(max), index];
    },
    /**
     * @param {number[]} joltages
     * @returns {number}
     */
    sumJoltages: (joltages) => {
      return joltages.reduce((total, value) => total + value, 0);
    }
  }

  // ----------

  partB() {
    this.#read();

    const joltages = this.#b.getHighestJoltages(this.#data);
    const result = this.#b.sumJoltages(joltages);

    return result;
  }

  #b = {
    desiredLength: 12,
    /**
     * Finds the highest "joltage" for each battery
     * @param {string[]} batteries
     * @returns {number[]}
     */
    getHighestJoltages: (batteries) => {
      const joltages = [];

      for (const battery of batteries) {
        joltages.push(this.#b.findHighestJoltage(battery));
      }

      return joltages;
    },
    /**
     * Finds the highest "joltage" for single battery.
     * This time, however, it needs 12 digits instead of 2.
     * @param {string} battery
     * @returns {number}
     */
    findHighestJoltage: (battery) => {
      let joltage = '';
      let minIndexToLookFor = 0;

      while (joltage.length < this.#b.desiredLength) {
        const maxIndexToLookFor = battery.length - this.#b.desiredLength + 1 + joltage.length;
        // console.log('  minI', minIndexToLookFor, ', maxI', maxIndexToLookFor, ', range', battery.slice(minIndexToLookFor, maxIndexToLookFor));
        const [digit, index] = this.#b.findHighestDigitWithIndex(battery.slice(minIndexToLookFor, maxIndexToLookFor));
        // console.log('    digit', digit, ', i', index);
        joltage += digit;
        minIndexToLookFor += index + 1;

        if (index === maxIndexToLookFor) {
          joltage += battery.slice(maxIndexToLookFor + 1);
        }
      }

      return Number(joltage);
    },
    /**
     * Iterates through a string of digits to find the highest one. Returns max value and its index.
     * @param {string} string
     * @returns {[string, number]}
     */
    findHighestDigitWithIndex: (string) => {
      let max = 0;
      let index = 0;

      for (let i = 0; i <= string.length; i++) {
        if (Number(string[i]) > max) {
          max = Number(string[i]);
          index = i;
        }
      }

      return [String(max), index];
    },
    /**
     * @param {number[]} joltages
     * @returns {number}
     */
    sumJoltages: (joltages) => {
      return joltages.reduce((total, value) => total + value, 0);
    }
  }
}

result();
