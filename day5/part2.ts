import { readInput } from '../utils';

// const lines = readInput('sample.txt');
const lines = readInput('input.txt');

const [freshRangesStr, availableIngredientsStr] = lines.split('\n\n').map(line => line.split('\n'));

const freshRanges = freshRangesStr.map(range => range.split('-').map(Number));
const availableIngredients = availableIngredientsStr.map(Number);

// Merge overlapping ranges and return a new set of non-overlapping ranges
function mergeRanges(ranges: number[][]) {
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);
    const mergedRanges = [];
    for (const range of sortedRanges) {
        if (mergedRanges.length === 0) {
            mergedRanges.push(range);
        } else {
            const lastRange = mergedRanges[mergedRanges.length - 1];
            if (range[0] <= lastRange[1]) {
                lastRange[1] = Math.max(lastRange[1], range[1]);
            } else {
                mergedRanges.push(range);
            }
        }
    }
    return mergedRanges;
}

const mergedRanges = mergeRanges(freshRanges);

// count the number of ingredients in merged ranges
const count = mergedRanges.reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);

console.log("Answer:", count);