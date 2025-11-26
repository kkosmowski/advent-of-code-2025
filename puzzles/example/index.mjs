import read from '../../helpers/read.mjs';

/**
 * @type {{puzzle: number | 'example', split: boolean}}
 */
const options = { puzzle: 'example', split: true };

const inputSm = 'input_sm.txt';
const inputMd = 'input_md.txt';
const inputLg = 'input_lg.txt';
const realInput = 'input.txt';

function result() {
  const puzzle = new PuzzleExample();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}

// ----------------------------------------

class PuzzleExample {
  #data;
  #columnSeparator = '   ';

  #read() {
    // this.#data = read(inputSm, options);
    // this.#data = read(inputMd, options);
    // this.#data = read(inputLg, options);
    this.#data = read(realInput, options);
  }

  partA() {
    this.#read();

    const columns = this.#a.getColumns();
    const sortedColumns = this.#a.sortColumns(columns);
    const result = this.#a.subtractColumns(sortedColumns);

    return result;
  }

  #a = {
    getColumns: () => {
      const columns = [];

      const columnsCount = this.#data[0].split(this.#columnSeparator).length;

      for (let i = 0; i < columnsCount; i++) {
        columns.push([]);
      }

      for (let line of this.#data) {
        const values = line.split(this.#columnSeparator);

        for (let i = 0; i < values.length; i++) {
          columns[i].push(parseInt(values[i]));
        }
      }

      return columns;
    },
    sortColumns: (columns) => {
      return columns.map(this.#a.sortColumn);
    },
    sortColumn: (column) => {
      return column.sort((a, b) => a - b);
    },
    subtractColumns: (columns) => {
      const left = columns[0];
      const right = columns[1];
      let result = 0;

      for (let i in left) {
        result += Math.abs(left[i] - right[i])
      }

      return result;
    },
  }

  // ----------

  partB() {
    this.#read();

    const columns = this.#a.getColumns();
    const result = this.#b.findSimilarity(columns);

    return result;
  }

  #b = {
    findSimilarity: (columns)=> {
      const left = columns[0];
      const right = columns[1];
      let result = 0;

      for (let i in left) {
        let count = 0;

        for (let j in right) {
          if (left[i] === right[j]) count++;
        }

        result += left[i] * count;
      }

      return result;
    }
  }
}

result();
