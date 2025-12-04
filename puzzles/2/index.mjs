import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 2, split: false };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle2();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle2 {
  #data;

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options);
    // this.#data = read(inputLg, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const ranges = this.#a.splitIntoRanges(this.#data);
    const invalidIds = ranges.map(this.#a.findInvalidIdsInRange);

    return this.#a.sumIds(invalidIds);
  }

  #a = {
    /**
     * Takes a single long string and transforms it into an array of tuples (2-item long subarrays) of stringified numbers
     * @param {string} data
     * @returns {[string, string][]}
     */
    splitIntoRanges: (data) => {
      return data.split(',').map((stringRange) => {
        const [firstId, lastId] = stringRange.split('-');
        return [firstId, lastId];
      });
    },
    /**
     * Takes a range and returns array of invalid ids
     * @param {[string, string]} range
     * @returns {number[]}
     */
    findInvalidIdsInRange: ([firstId, lastId]) => {
      const invalidIds = [];

      for (let id = Number(firstId); id <= Number(lastId); id++) {
        if (this.#a.isIdInvalid(String(id))) {
          invalidIds.push(id);
        }
      }

      return invalidIds;
    },
    /** Checks whether given id is invalid (is a substring that repeats twice, e.g "11", "2323", "567567" or "88888888")
     * @param {string} id
     * @returns {boolean}
     */
    isIdInvalid: (id) => {
      if (id.length % 2 === 1) return false;

      const half = id.slice(0, id.length / 2);
      return id === half.concat(half);
    },
    /** Takes string ids and sums them to return a number
     *
     * @param {number[][]} ids
     * @returns {number}
     */
    sumIds: (ids)=> {
      return ids.flat().reduce((total, id) => total + id, 0);
    },
  }

  // ----------

  partB() {
    this.#read();

    const ranges = this.#b.splitIntoRanges(this.#data);
    const invalidIds = ranges.map(this.#b.findInvalidIdsInRange);

    return this.#b.sumIds(invalidIds);
  }

  #b = {
    /**
     * Takes a single long string and transforms it into an array of tuples (2-item long subarrays) of stringified numbers
     * @param {string} data
     * @returns {[string, string][]}
     */
    splitIntoRanges: (data) => {
      return data.split(',').map((stringRange) => {
        const [firstId, lastId] = stringRange.split('-');
        return [firstId, lastId];
      });
    },
    /**
     * Takes a range and returns array of invalid ids
     * @param {[string, string]} range
     * @returns {number[]}
     */
    findInvalidIdsInRange: ([firstId, lastId]) => {
      const invalidIds = [];

      for (let id = Number(firstId); id <= Number(lastId); id++) {
        if (this.#b.isIdInvalid(String(id))) {
          invalidIds.push(id);
        }
      }
      console.log(invalidIds)
      return invalidIds;
    },
    /** Checks whether given id is invalid  (is a substring that repeats any times, e.g "11", "222", "454545" or "77777")
     * @param {string} id
     * @returns {boolean}
     */
    isIdInvalid: (id) => {
      for (let length = 1; length <= id.length / 2; length++) {
        const slice = id.slice(0, length);

        const canRepeatFullSlices = id.length % slice.length === 0;
        const repeatedSlice = ''.padEnd(id.length, slice);

        if (canRepeatFullSlices && repeatedSlice === id) {
          return true;
        }
      }

      return false;
    },
    /** Takes string ids and sums them to return a number
     *
     * @param {number[][]} ids
     * @returns {number}
     */
    sumIds: (ids)=> {
      return ids.flat().reduce((total, id) => total + id, 0);
    },
  }
}

result();
