import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the lines from the sample.txt file
// const lines = fs.readFileSync(path.join(__dirname, 'sample.txt'), 'utf8');
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const ranges = lines.split(',').map(range => range.split('-').map(Number))

const invalidIds = new Set<number>();

for (const range of ranges) {
    const [start, end] = range;
    // if startDigits is odd, round up.
    let startDigits = Math.ceil((Math.floor(Math.log10(Math.abs(start))) + 1) / 2);
    // if endDigits is odd, round down.
    let endDigits = Math.floor((Math.floor(Math.log10(Math.abs(end))) + 1) / 2);

    // console.log({ start, end, startDigits, endDigits });

    const firstHalf = Math.floor(start / Math.pow(10, startDigits));
    const secondHalf = Math.floor(end / Math.pow(10, endDigits));
    const remainingLength = Math.max(startDigits, endDigits);
    for (let i = firstHalf; i <= secondHalf; i++) {
        const strI = i.toString();
        const totalLength = strI.length + remainingLength;
        // console.log({ startDigits, endDigits, remainingLength, firstHalf, secondHalf, strI, factors: factors(totalLength) });
        for (const factor of factors(totalLength)) {
            if (factor === totalLength) {
                continue;
            }
            const invalidId = Number(strI.slice(0, factor).repeat((totalLength / factor)));
            // console.log(`"${strI}".slice(0, ${factor}).repeat(${totalLength} / ${factor}) = ${invalidId}`);
            if (invalidId >= start && invalidId <= end) {
                invalidIds.add(invalidId);
            }
        }
    }
}

console.log(invalidIds);
console.log(`Answer: ${Array.from(invalidIds).reduce((a, b) => a + b, 0)}`);

function factors(n: number) {
    return Array.from({ length: n }, (_, i) => i + 1).filter(i => n % i === 0);
}