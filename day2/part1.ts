import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the lines from the sample.txt file
// const lines = fs.readFileSync(path.join(__dirname, 'sample.txt'), 'utf8');
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const ranges = lines.split(',').map(range => range.split('-').map(Number));

const invalidIds = [];

for (const range of ranges) {
    const [start, end] = range;
    // if startDigits is odd, round up.
    let startDigits = Math.ceil((Math.floor(Math.log10(Math.abs(start))) + 1) / 2);
    // if endDigits is odd, round down.
    let endDigits = Math.floor((Math.floor(Math.log10(Math.abs(end))) + 1) / 2);

    // console.log({ start, end, startDigits, endDigits });

    const firstHalf = Math.floor(start / Math.pow(10, startDigits));
    const secondHalf = Math.floor(end / Math.pow(10, endDigits));
    for (let i = firstHalf; i <= secondHalf; i++) {
        const currentDigits = Math.floor(Math.log10(Math.abs(i))) + 1;
        const invalidId = i * Math.pow(10, currentDigits) + i;
        // console.log(`${i} * Math.pow(10, ${startDigits}) + ${i} = ${invalidId}`);
        if (invalidId >= start && invalidId <= end) {
            invalidIds.push(invalidId);
        }
    }
}

console.log(invalidIds);
console.log(`Answer: ${invalidIds.reduce((a, b) => a + b, 0)}`);