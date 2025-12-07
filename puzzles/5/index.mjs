import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 5, split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle5();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle5 {
  #data;

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options); // custom input for part B
    // this.#data = read(inputLg, options); // custom input for part B
    this.#data = read(realInput, options);
    // B 366926946809962 - too high
    // B 352347720583355 - too high
  }

  partA() {
    this.#read();

    const [ranges, ids] = this.#a.getRangesAndIds(this.#data);
    const count = this.#a.countFreshIngredients(ids, ranges);
    return count;
  }

  #a = {
    /**
     * splits the data into array of ranges and array of ids
     * @param {string[]} data
     * @returns {[[number, number][], number[]]}
     */
    getRangesAndIds: (data) => {
      const ranges = [];
      const ids = [];

      let isRange = true;
      let i = 0;

      for (; i < data.length; i++) {
        if (data[i] === '') {
          isRange = false;
          i++;
          break;
        }

        ranges.push(data[i].split('-').map(Number))
      }

      for (; i < data.length; i++) {
        ids.push(Number(data[i]));
      }

      return [ranges, ids];
    },
    /**
     * finds fresh ingredients and returns their count
     * @param {number[]} ids ingredients ids
     * @param {[number, number][]} ranges ranges of fresh ingredient ids
     * @returns {number}
     */
    countFreshIngredients: (ids, ranges) => {
      let count = 0;

      for (const id of ids) {
        for (const [min, max] of ranges) {
          if (id <= max && id >= min) {
            count++;
            break;
          }
        }
      }

      return count;
    },
  }

  // ----------

  partB() {
    this.#read();

    const ranges = this.#b.getRanges(this.#data);

    let mergedRanges = this.#b.mergeRanges(ranges);
    // merge the ranges one more time – kind of a workaround
    // but it will save the time needed to reimplement this
    mergedRanges = this.#b.mergeRanges(mergedRanges);
    // reverse the ranges and re-merge them
    mergedRanges = this.#b.mergeRanges(mergedRanges.toReversed());

    const count = this.#b.countFreshIngredientIds(mergedRanges);

    return count;
  }

  #b = {
    /**
     * parses the data into array of ranges and ignores the second part
     * @param {string[]} data
     * @returns {[number, number][]}
     */
    getRanges: (data) => {
      const ranges = [];

      for (const row of data) {
        if (row === '') {
          return ranges;
        }

        ranges.push(row.split('-').map(Number));
      }
    },
    /**
     * counts total fresh ingredient ids across all the ranges
     * this function expects non-overlapping ranges to count properly
     * @param {[number, number][]} ranges ranges of fresh ingredient ids
     * @returns {number}
     */
    countFreshIngredientIds: (ranges) => {
      return ranges.reduce((total, [start, end]) => {
        const idsInRange = end - start + 1;
        return total + idsInRange;
      }, 0);
    },
    /**
     * merges overlapping ranges into (shorter) array of merged ones
     * e.g. 2-5, 10-20, 22-25, 4-8, 12-18 -> 2-8, 10-20, 22-25
     * @param {[number, number][]} ranges
     * @returns {[number, number][]}
     */
    mergeRanges: (ranges) => {
      const newRanges = [];

      for (const [startA, endA] of ranges) {
        let toAdd  = true;

        for (let i = 0; i < newRanges.length; i++) {
          const [startB, endB] = newRanges[i];
          const startsInside = startA >= startB && startA <= endB;
          const endsInside = endA >= startB && endA <= endB;

          if (startsInside || endsInside) {
            // do not add after exiting the inner loop
            // the range is either a subrange, or will be merged with existing one
            toAdd = false;
          }

          if (startsInside && endsInside) {
            break;
          }

          if (startsInside) {
            newRanges[i] = [startB, endA];
          } else if (endsInside) {
            newRanges[i] = [startA, endB];
          }
        }

        if (toAdd) {
          newRanges.push([startA, endA]);
        }
        // console.log(newRanges);
      }

      return newRanges;
    }
  };
}

result();
