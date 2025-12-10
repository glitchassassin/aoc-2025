import { readInput } from "../utils";

type Coord = {
    x: number;
    y: number;
}
type Edge = [Coord, Coord];

// const lines = readInput('sample.txt').split('\n');
const lines = readInput('input.txt').split('\n');

const tiles: Coord[] = lines.map(line => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
});

function area(tile1: Coord, tile2: Coord): number {
    return (Math.abs(tile1.x - tile2.x) + 1) * (Math.abs(tile1.y - tile2.y) + 1);
}
function cornerInsideRect(rect: [Coord, Coord]): boolean {
    const minX = Math.min(rect[0].x, rect[1].x);
    const maxX = Math.max(rect[0].x, rect[1].x);
    const minY = Math.min(rect[0].y, rect[1].y);
    const maxY = Math.max(rect[0].y, rect[1].y);
    return tiles.some(corner => corner.x > minX && corner.x < maxX && corner.y > minY && corner.y < maxY);
}
function edgeInsideRect(rect: [Coord, Coord], edge: Edge): boolean {
    const rectMin = {
        x: Math.min(rect[0].x, rect[1].x),
        y: Math.min(rect[0].y, rect[1].y)
    };
    const rectMax = {
        x: Math.max(rect[0].x, rect[1].x),
        y: Math.max(rect[0].y, rect[1].y)
    };
    const edgeMin = {
        x: Math.min(edge[0].x, edge[1].x),
        y: Math.min(edge[0].y, edge[1].y)
    };
    const edgeMax = {
        x: Math.max(edge[0].x, edge[1].x),
        y: Math.max(edge[0].y, edge[1].y)
    };

    if (edgeMin.x > rectMin.x && edgeMax.x < rectMax.x) {
        // edge is contained on the x-axis; does it intersect the rect on the y-axis?
        // console.log("Edge is contained on the x-axis; does it intersect the rect on the y-axis?", {edgeMin, edgeMax, rectMin, rectMax});
        return edgeMin.y < rectMax.y && edgeMax.y > rectMin.y;
    }
    if (edgeMin.y > rectMin.y && edgeMax.y < rectMax.y) {
        // edge is contained on the y-axis; does it intersect the rect on the x-axis?
        return edgeMin.x < rectMax.x && edgeMax.x > rectMin.x;
    }
    return false;
}
function rectIsContainedInPolygon(rect: [Coord, Coord]): boolean {
    for (let i = 0; i < tiles.length; i++) {
        if (edgeInsideRect(rect, [tiles[i], tiles[(i + 1) % tiles.length]])) {
            return false;
        }
    }
    return true;
}

let maxArea = 0;
for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
        const tile1 = tiles[i];
        const tile2 = tiles[j];
        const a = area(tile1, tile2);
        if (a > maxArea) {
            const isContained = rectIsContainedInPolygon([tile1, tile2]);
            // console.log("New rect", tile1, tile2, "has area:", a, "is contained:", isContained);
            if (isContained) {
                maxArea = a;
            }
        }
    }
}

console.log("Answer:", maxArea);