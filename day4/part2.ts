import { readInput } from "../utils";

// const lines = readInput('sample.txt');
const lines = readInput('input.txt');

const grid = lines.split('\n').map(line => line.split(''));
const MAX_X = grid[0].length;
const MAX_Y = grid.length;

function inGrid({ x, y }: { x: number, y: number }) {
    return x >= 0 && x < MAX_X && y >= 0 && y < MAX_Y;
}

function adjacents({ x, y }: { x: number, y: number }) {
    return [
        { x: x - 1, y: y - 1 },
        { x: x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x - 1, y: y + 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y + 1 },
    ].filter(inGrid);
}

let count = 0;
while (true) {
    const rolls: { x: number, y: number }[] = [];
    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            if (grid[y][x] === '@') {
                const occupied = adjacents({ x, y }).filter(adjacent => grid[adjacent.y][adjacent.x] === '@').length;
                if (occupied < 4) {
                    rolls.push({ x, y });
                }
            }
        }
    }
    count += rolls.length;
    for (const { x, y } of rolls) {
        grid[y][x] = '.';
    }
    if (rolls.length === 0) {
        break;
    }
}

console.log("Answer:", count);