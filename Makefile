# Usage: make run=NUM, e.g.: make run=2
puzzle:
	@node puzzles/$(run)/index.mjs
