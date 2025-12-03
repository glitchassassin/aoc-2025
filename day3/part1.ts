import { readInput } from '../utils';

// const lines = readInput('sample.txt');
const lines = readInput('input.txt');

const batteryBanks = lines.split('\n').map(line => line.split('').map(Number));

function getMaxWithIndex(batteries: number[]) {
    let maxIndex = 0;
    for (let i = 0; i < batteries.length; i++) {
        if (batteries[i] > batteries[maxIndex]) {
            maxIndex = i;
        }
    }
    return { max: batteries[maxIndex], index: maxIndex };
}

function bestJoltage(batteries: number[]) {
    const { index: b1index, max: b1 } = getMaxWithIndex(batteries.slice(0, -1));
    const { max: b2 } = getMaxWithIndex(batteries.slice(b1index + 1));
    
    return b1 * 10 + b2;
}

let sum = 0
for (const batteries of batteryBanks) {
    const best = bestJoltage(batteries);
    console.log(`${batteries.join('')} -> ${best}`);
    sum += best;
}

console.log(`Total output joltage: ${sum}`);