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

function bestJoltage(batteries: number[], count: number) {
    let sum = 0;
    let lastIndex = 0;
    for (let i = count - 1; i >= 0; i--) {
        const subset = i === 0 ? batteries.slice(lastIndex) : batteries.slice(lastIndex, -i);
        // console.log(subset.join(''), { count, i })
        const {index: newIndex, max } = getMaxWithIndex(subset);
        sum += max * Math.pow(10, i);
        lastIndex += newIndex + 1;
    }
    return sum;
}

let sum = 0
for (const batteries of batteryBanks) {
    const best = bestJoltage(batteries, 12);
    // console.log(`${batteries.join('')} -> ${best}`);
    sum += best;
}

console.log(`Total output joltage: ${sum}`);