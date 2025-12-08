import { readInput, renderGrid } from "../utils";

// const input = readInput('sample.txt');
const input = readInput('input.txt');

const lines = input.split('\n');

const grid = lines.map(line => line.split(''));
const possibleWorlds = grid.map(row => row.map(() => 0));

function addTachyonBeam(x: number, y: number) {
    const previousPossibleWorlds = possibleWorlds[y - 1][x];

    if (grid[y][x] === '^') {
        // splitter - tachyon beam splits into two
        grid[y][x + 1] = '|';
        grid[y][x - 1] = '|';
        possibleWorlds[y][x + 1] += previousPossibleWorlds;
        possibleWorlds[y][x - 1] += previousPossibleWorlds;
    } else {
        grid[y][x] = '|';
        possibleWorlds[y][x] += previousPossibleWorlds || 1;
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

// renderGrid(grid);
renderGrid(possibleWorlds.map(row => row.map(cell => cell.toString().padStart(2, '0') + " ")));

console.log("Answer:", possibleWorlds.at(-1)?.reduce((acc, cell) => acc + cell, 0));