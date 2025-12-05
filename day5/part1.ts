import { readInput } from '../utils';

// const lines = readInput('sample.txt');
const lines = readInput('input.txt');

const [freshRangesStr, availableIngredientsStr] = lines.split('\n\n').map(line => line.split('\n'));

const freshRanges = freshRangesStr.map(range => range.split('-').map(Number));
const availableIngredients = availableIngredientsStr.map(Number);

let count = 0;
for (const ingredient of availableIngredients) {
    for (const range of freshRanges) {
        if (ingredient >= range[0] && ingredient <= range[1]) {
            count++;
            break;
        }
    }
}

console.log("Answer:", count);