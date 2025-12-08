import { readInput, renderGrid } from "../utils";

// const input = readInput('sample.txt');
const input = readInput('input.txt');

const lines = input.split('\n');

const grid = lines.map(line => line.split(''));

let splits = 0;
function addTachyonBeam(x: number, y: number) {
    if (grid[y][x] === '^') {
        // splitter - tachyon beam splits into two
        addTachyonBeam(x + 1, y);
        addTachyonBeam(x - 1, y);
        splits++;
    } else {
        grid[y][x] = '|';
    }
}

// Trace tachyon beam from S through splitters
for (let y = 0; y < grid.length - 1; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'S') {
            // cell below S gets a tachyon beam
            addTachyonBeam(x, y + 1);
        } else if (grid[y][x] === '|') {
            // continue tachyon beam
            addTachyonBeam(x, y + 1);
        }
    }
}

// count final tachyon beam cells
const count = grid.at(-1)?.filter(cell => cell === '|').length ?? 0;

renderGrid(grid);

console.log("Answer:", splits);