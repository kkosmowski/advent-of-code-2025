import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 4, split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle4();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle4 {
  #data;

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options);
    // this.#data = read(inputLg, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const board = this.#a.getBoard(this.#data);
    const accessibleRollsCount = this.#a.getAccessibleRollsCount(board);

    return accessibleRollsCount;
  }

  #a = {
    maxAllowedNeighbours: 3,
    /**
     * transforms single array into 2-d representation of a board
     * @param {string[]} data
     * @returns {boolean[][]}
     */
    getBoard: (data) => {
      return data.map((string) => string.split('').map((char) => char === '@'))
    },
    /**
     * finds the number of rolls of paper that can be accessed by a forklift
     * @param {boolean[][]} board
     * @returns {number}
     */
    getAccessibleRollsCount: (board) => {
      let count = 0;

      for (let i = 0 ; i < board.length; i++) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
          const isRoll = board[i][j];

          if (!isRoll) continue;

          const neighboursCount = this.#a.getNeighboursCount(board, i, j);

          if (neighboursCount <= this.#a.maxAllowedNeighbours) {
            count++;
          }
        }
      }

      return count;
    },
    /**
     * finds the number of neighbouring rolls
     * @param {boolean[][]} board
     * @param {number} i row index
     * @param {number} j column index
     * @returns {number}
     */
    getNeighboursCount: (board, i, j) => {
      const neighbouringSpots = [
        [i-1, j-1], [i-1, j], [i-1, j+1],
        [i, j-1],/*current spot*/[i, j+1],
        [i+1, j-1], [i+1, j], [i+1, j+1],
      ];

      return neighbouringSpots.reduce((total, spot) => {
        const isRollPresent = this.#a.checkSpotForRoll(board, spot);
        return isRollPresent ? total + 1 : total;
      }, 0);
    },
    /**
     * checks whether given spot contains roll of paper
     * @param {boolean[][]} board
     * @param {[number, number]} spot coordinates of a single board spot
     * @returns boolean
     */
    checkSpotForRoll: (board, spot) => {
      const [x, y] = spot;

      if (x < 0 || x >= board.length) return false;
      if (y < 0 || y >= board[0].length) return false;

      return board[x][y];
    }
  }

  // ----------

  partB() {
    this.#read();
    
    const count = this.#b.countAllRollsThatCanBeRemoved(this.#data);
    return count;
  }
  
  #b = {
    maxAllowedNeighbours: 3,
    /**
     * finds and removes rolls of paper until it is possible, then returns the removed count
     * @param {string[]} data
     * @returns {number}
     */
    countAllRollsThatCanBeRemoved: (data) => {
      let board = this.#b.getBoard(data);
      let count = 0;
      
      while (true) {
        const accessibleRolls = this.#b.getAccessibleRolls(board);
        
        if (accessibleRolls.length === 0) {
          return count
        }

        // idea: this could be optimised to remove rows that are completely empty, in other words
        //  it could trim the board, but we'd have to take into account the shift of coordinates
        //  current input is small enough to not need this optimisation though
        board = this.#b.removeRolls(board, accessibleRolls);
        count += accessibleRolls.length;
      }
    },
    /**
     * transforms single array into 2-d representation of a board
     * @param {string[]} data
     * @returns {boolean[][]}
     */
    getBoard: (data) => {
      return data.map((string) => string.split('').map((char) => char === '@'))
    },
    /**
     * finds rolls of paper that can be accessed by a forklift
     * @param {boolean[][]} board
     * @returns {[number, number][]}
     */
    getAccessibleRolls: (board) => {
      let rollsCoordinates = [];

      for (let i = 0 ; i < board.length; i++) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
          const isRoll = board[i][j];

          if (!isRoll) continue;

          const neighboursCount = this.#b.getNeighboursCount(board, i, j);

          if (neighboursCount <= this.#b.maxAllowedNeighbours) {
            rollsCoordinates.push([i, j])
          }
        }
      }

      return rollsCoordinates;
    },
    /**
     * finds the number of neighbouring rolls
     * @param {boolean[][]} board
     * @param {number} i row index
     * @param {number} j column index
     * @returns {number}
     */
    getNeighboursCount: (board, i, j) => {
      const neighbouringSpots = [
        [i-1, j-1], [i-1, j], [i-1, j+1],
        [i, j-1],/*current spot*/[i, j+1],
        [i+1, j-1], [i+1, j], [i+1, j+1],
      ];

      return neighbouringSpots.reduce((total, spot) => {
        const isRollPresent = this.#b.checkSpotForRoll(board, spot);
        return isRollPresent ? total + 1 : total;
      }, 0);
    },
    /**
     * checks whether given spot contains roll of paper
     * @param {boolean[][]} board
     * @param {[number, number]} spot coordinates of a single board spot
     * @returns boolean
     */
    checkSpotForRoll: (board, spot) => {
      const [x, y] = spot;

      if (x < 0 || x >= board.length) return false;
      if (y < 0 || y >= board[0].length) return false;

      return board[x][y];
    },
    /**
     * moodifies the board by removing given rolls coordinates
     * @param {boolean[][]} board
     * @param {[number, number][]} rolls
     * @returns {boolean[][]} board
     */
    removeRolls: (board, rolls) => {
      for (const [i, j] of rolls) {
        if (board[i][j] === false) {
          console.error('Error: trying to remove a roll that is not there. [i', i, '], [j', j, ']');
        }

        board[i][j] = false;
      }

      return board;
    },
  }
}

result();
