import { readInput } from '../utils';

// const lines = readInput('sample.txt').split('\n');
const lines = readInput('input.txt').split('\n');

const graph = new Map<string, string[]>();
for (const line of lines) {
    const [from, to] = line.split(': ');
    graph.set(from, to.split(' '));
}

const pathsToPoint = new Map<string, number>();
pathsToPoint.set('you', 1);

const frontier = ['you'];
while (frontier.length > 0) {
    const current = frontier.shift();
    if (!current) break;
    const paths = graph.get(current);
    if (!paths) continue;
    for (const path of paths) {
        pathsToPoint.set(path, (pathsToPoint.get(path) ?? 0) + 1);
        frontier.push(path);
    }
}

console.log(pathsToPoint.get('out'));