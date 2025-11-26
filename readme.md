# Advent Of Code 2025

by kkosmowski

## Introduction

This repository stores vanilla JavaScript solutions to puzzles presented in 2025 edition of [Advent of Code](https://adventofcode.com) event. The approach is highly suggested by the custom "framework", that encompasses each day in a JS class.

These solutions are for education purposes only. Note that some of them might not be of the highest quality. I sincerely encourage you to try the challenges yourself before checking my approaches.

## Project contents

- `helpers` – directory of potential util functions needed now or in the future.
  - currently it only stores `read` util that opens input file and transforms its content into string or an array.
- `puzzles` – here I'll be working on each puzzle and place solutions in respective files
  - it contains twelve directories (`1`, `2`, ... `12`) for each puzzle
- `puzzles-template` – empty copy of the `puzzles` directory, that you can copy to work on AOC on your own
  - I will also use this directory next year (probably slightly enhanced) to prepare for Advent of Code 2026
- `Makefile` – contains a single command for running the script

## Usage and development

The idea is simple: choose the right day, say day 1. Open `puzzles/1/index.mjs` and start developing the solution. You will receive a small input to visualise the problem, for example:
```
AAAA
BBCD
BBCC
EEEC
```

I call that "small input". With it, you will receive a correct answer, in this example it is `140`. It's a good idea to paste this input into `input_sm.txt` file, save it and try to implement your solution so that it gives the right answer.

Sometimes you'll also get a medium-sized input, like this:

```
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
```

With this one (which I'd put into `input_md.txt`), and with answer being `720`, you can now improve your code to make sure it works for both examples.

Usually that's it, but some puzzles get even more examples. For this rare case I have prepared `input_lg.txt` too. Here's an example:

```
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
```

Now this input has its own correct answer. Don't be fooled though, this size is nothing compared to gigantic input you will get. See the next "Example puzzle" section for more.

Each day is made up of two parts: part A and B. In AOC, you have to provide the correct answer to part A problem, in order to see the part B.

My custom framework expects you to work in a JS class (e.g. `Puzzle1`), which has two methods: `partA()` and `partB()`. To run `partA`, run `make run=1` (where `1` is the number of the puzzle). 

To run `partB`, modify the `result()` function by switching to proper part, and then rerun the make run command. See below:

```js
// partA will be executed 

function result() {
  const puzzle = new Puzzle1();

  console.log(puzzle.partA());
  // console.log(puzzle.partB());
}
```

```js
// partB will be executed 

function result() {
  const puzzle = new Puzzle1();

  // console.log(puzzle.partA());
  console.log(puzzle.partB());
}
```

## Example puzzle

‼️ Please note the example spoils the first puzzle of AOC 2024.

See `puzzles/examples/index.mjs` to understand how the puzzle should be solved.

To run it, run a command analogical to instructions above. It's `make run=example`, though you should know that by now.

If everything works, by running this command you should receive an answer `2264607`, like this:

```shell
[~/Documents/AOC25]$ make run=example
2264607
```

Now, follow the "Usage and development" section above, and try to run partB.

Does it work? I won't spoil the answer, but I'll give you a hint: if it is divisible by `121607`, it is most likely correct 🎉

## Why bother lol

Well, because I like it and it makes my AOC easier to do. A lot of people start AOC, but don't finish (me included). This simply reduced the friction. I can read the puzzle, open the right directory, paste the first input and immediately start working on the issue.

You can choose to challenge yourself or not. Each is fine.