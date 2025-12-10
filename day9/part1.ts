import { readInput } from "../utils";

type Coord = {
    x: number;
    y: number;
}

// const lines = readInput('sample.txt').split('\n');
const lines = readInput('input.txt').split('\n');

const tiles: Coord[] = lines.map(line => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
});

function area(tile1: Coord, tile2: Coord): number {
    return (Math.abs(tile1.x - tile2.x) + 1) * (Math.abs(tile1.y - tile2.y) + 1);
}

let maxArea = 0;
for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
        const tile1 = tiles[i];
        const tile2 = tiles[j];
        const a = area(tile1, tile2);
        if (a > maxArea) {
            maxArea = a;
        }
    }
}

console.log("Answer:", maxArea);