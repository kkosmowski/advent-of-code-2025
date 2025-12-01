import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 1, split: true };

const inputSm = 'input_sm.txt';
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
    // this.#data = read(inputSm, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const result = this.#a.getResult(this.#data);

    return result;
  }

  #a = {
    maxPoint: 99,
    initialPoint: 50,
    zeroPointedCount: 0,
    getResult: (data) => {
      let currentDialPoint = this.#a.initialPoint;

      for (const dataPoint of data) {
        currentDialPoint = this.#a.getNextDialPoint(dataPoint, currentDialPoint);

        if (currentDialPoint === 0) {
          this.#a.zeroPointedCount += 1;
        }
      }

      return this.#a.zeroPointedCount;
    },
    /**
     *
     * @param {string} dataPoint
     * @param {number} currentDialPoint
     */
    getNextDialPoint: (dataPoint, currentDialPoint) => {
      const [direction, distance] = this.#a.getDirectionAndDistance(dataPoint);
      let result;

      switch (direction) {
        case 'L': {
          result = currentDialPoint - distance;
          break;
        }
        case 'R': {
          result = currentDialPoint + distance;
          break;
        }
        default: {
          throw new Error(`Unsupported direction: ${direction}`);
        }
      }

      return this.#a.customModulo(result, this.#a.maxPoint);
    },
    /**
     *
     * @param dataPoint
     * @return {['L' | 'R', number]}
     */
    getDirectionAndDistance: (dataPoint) => {
      const direction = dataPoint.slice(0, 1);
      const distance = Number(dataPoint.slice(1));
      return [direction, distance];
    },
    customModulo: (value, mod) => {
      let result = value;
      if (result < 0) {
        while (result < 0) {
          result = result + (mod + 1);
        }
      } else {
        result = result % (mod + 1);
      }
      return result;
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
