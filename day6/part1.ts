import { readInput } from "../utils";

// const input = readInput('sample.txt');
const input = readInput('input.txt');

const lines = input.split('\n').map(line => line.trim().split(/ +/));
const spreadsheet = lines.slice(0, -1).map(line => line.map(Number));
const operations = lines.at(-1);

if (!operations) throw new Error('No operations found');
if (!lines.every(line => line.length === operations.length)) throw new Error('Spreadsheet and operations have different lengths');

let sum = 0;
for (let problem = 0; problem < operations.length; problem++) {
    const operation = operations[problem];
    const column = spreadsheet.map(row => row[problem]);
    if (operation === '+') {
        sum += column.reduce((acc, num) => acc + num, 0);
        // console.log(column.join(' + '), '=', sum);
    } else if (operation === '*') {
        sum += column.reduce((acc, num) => acc * num, 1);
        // console.log(column.join(' * '), '=', sum);
    }
}

console.log("Answer:", sum);