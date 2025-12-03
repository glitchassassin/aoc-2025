import fs from 'fs';

// Read the lines from the sample.txt file
// const lines = fs.readFileSync('day1/sample.txt', 'utf8').split('\n');
const lines = fs.readFileSync('day1/input.txt', 'utf8').split('\n');

const rotations = lines.map(line => parseInt(line.replace('L', '-').replace('R', '+')));

let position = 50;
let zeroCount = 0;
for (const rotation of rotations) {
    position = (position + rotation + 100) % 100;
    if (position === 0) {
        zeroCount++;
    }
}

console.log("Found", rotations.length, "rotations");
console.log("Password: " + zeroCount);