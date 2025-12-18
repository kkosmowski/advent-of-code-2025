import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number, split: boolean}}
 */
const options = { puzzle: 6, split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new Puzzle6();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class Puzzle6 {
  #data;

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options);
    // this.#data = read(inputLg, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const problems = this.#a.splitDataIntoProblems(this.#data);
    const result = this.#a.sumAllProblems(problems);

    return result;
  }

  #a = {
    /**
     * transforms vertical problems into regular ones (array of arrays, where each inner array
     * has the operator and then numbers)
     * @param {string[]} data
     * @returns {[string | number][]} problems ([string, ...numbers])
     */
    splitDataIntoProblems: (data) => {
      const problems = [];
      const splitData = data.map((row) => row.trim().split(/\s+/));
      const numberOfNumbers = splitData.length; // last one is the operator

      for (let i = 0; i < splitData[0].length; i++) {
        const problem = [splitData[numberOfNumbers - 1][i]];

        for (let j = 0; j < numberOfNumbers - 1; j++) {
          problem.push(Number(splitData[j][i]));
        }
        problems.push(problem);
      }

      return problems;
    },
    /**
     *
     * @param {(string | number)[][]} problems
     * @returns number
     */
    sumAllProblems: (problems) => {
      let total = 0;

      for (const problem of problems) {
        total += this.#a.solveProblem(problem);
      }

      return total;
    },
    /**
     *
     * @param {(string | number)[]} problem
     * @returns number
     */
    solveProblem: (problem) => {
      const [operator, ...numbers] = problem;

      switch (operator) {
        case '+':
          return numbers.reduce((total, number) => total + number, 0);
        case '*':
          return numbers.reduce((total, number) => total * number, 1);
        default:
          console.error('Unknown operator: ' + operator);
      }
    }
  }

  // ----------

  partB() {
    this.#read();

    const problems = this.#b.splitDataIntoProblemsVertically(this.#data);
    const cephalopodProblems = this.#b.transformProblems(problems);
    const result = this.#b.sumAllProblems(cephalopodProblems);

    return result;
  }

  #b = {

    /**
     * transforms vertical problems into regular ones (array of arrays, where each inner array
     * has the operator and then numbers)
     * @param {string[]} data
     * @returns {string[][]} problems
     */
    splitDataIntoProblemsVertically: (data) => {
      const longestRowLength = this.#b.findTheLongestRow(data);
      const problems = [];

      for (let y = 0; y < longestRowLength; y++) {

        problems.push([]);

        for (const x of data) {
          problems[problems.length - 1].push(x[y] ?? ' ');
        }
      }

      return problems
    },
    /**
     *
     * @param {string[]} data
     * @returns {number}
     */
    findTheLongestRow:(data) => {
      return Math.max(...data.map((row) => row.length));
    },
    /**
     *
     * @param {string[][]} problems
     * @returns {[string | number][]} problems ([string, ...numbers])
     */
    transformProblems: (problems) => {
      const cephalopodProblems = [[]];
      console.log(problems)
      for (const column of problems) {
        console.log(column);
        let number = '';

        for (const char of column) {
          if (char === ' ') continue;
          if (char === '*' || char === '+') {
            cephalopodProblems[cephalopodProblems.length - 1].push(char);
            continue;
          }
          number += char;
        }

        if (number === '') {
          cephalopodProblems.push([]);
          continue;
        }
        cephalopodProblems[cephalopodProblems.length - 1].push(Number(number));
      }

      return cephalopodProblems;
    },
    /**
     *
     * @param {(string | number)[][]} problems
     * @returns number
     */
    sumAllProblems: (problems) => {
      let total = 0;

      for (const problem of problems) {
        total += this.#a.solveProblem(problem);
      }

      return total;
    },
    /**
     *
     * @param {(string | number)[]} problem
     * @returns number
     */
    solveProblem: (problem) => {
      const [operator, ...numbers] = problem;

      switch (operator) {
        case '+':
          return numbers.reduce((total, number) => total + number, 0);
        case '*':
          return numbers.reduce((total, number) => total * number, 1);
        default:
          console.error('Unknown operator: ' + operator);
      }
    }
  }
}

result();
