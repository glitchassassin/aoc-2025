import { readInput } from "../utils";

type Coord3D = {
    x: number;
    y: number;
    z: number;
}

// const connectionsPerCycle = 10;
// const lines = readInput('sample.txt').split('\n');
const connectionsPerCycle = 1000;
const lines = readInput('input.txt').split('\n');

const junctions: Coord3D[] = lines.map(line => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z };
});

const connections: [Coord3D, Coord3D][] = [];

function distance(a: Coord3D, b: Coord3D): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}

function closestDisconnectedPair(junctions: Coord3D[]): [Coord3D, Coord3D] {
    let closest: [Coord3D, Coord3D] = [junctions[0], junctions[1]];
    let closestDistance = distance(closest[0], closest[1]);
    for (let i = 0; i < junctions.length; i++) {
        for (let j = i + 1; j < junctions.length; j++) {
            const d = distance(junctions[i], junctions[j]);
            if (d < closestDistance) {
                if (connections.some(connection => connection.includes(junctions[i]) && connection.includes(junctions[j]))) {
                    // already connected
                    continue;
                }
                closest = [junctions[i], junctions[j]];
                closestDistance = d;
            }
        }
    }
    return closest;
}

let circuits: Set<Coord3D>[] = junctions.map(junction => new Set([junction]));
while (circuits.length > 1) {
    console.log("Connections:", connections.length, "Circuits:", circuits.length)
    const [a, b] = closestDisconnectedPair(junctions);
    connections.push([a, b]);
    const matchingCircuits = circuits.filter(circuit => circuit.has(a) || circuit.has(b));
    if (matchingCircuits.length === 2) {
        // merge circuits
        circuits = circuits.filter(circuit => !matchingCircuits.includes(circuit));
        circuits.push(new Set([...matchingCircuits[0], ...matchingCircuits[1]]));
    }
}

console.log("Last connection:", connections.at(-1));
console.log("Answer:", connections.at(-1)?.reduce((acc, connection) => acc * connection.x, 1));