import fs from 'fs';

// Read the lines from the sample.txt file
// const lines = fs.readFileSync('day1/sample.txt', 'utf8').split('\n');
const lines = fs.readFileSync('day1/input.txt', 'utf8').split('\n');

const rotations = lines.map(line => parseInt(line.replace('L', '-').replace('R', '+')));

let position = 50;
let zeroCount = 0;
for (const rotation of rotations) {
    let zeroes = Math.floor(Math.abs(rotation) / 100);
    const remainder = rotation % 100;
    const oldPosition = position;

    if (position !== 0) {
        if (remainder >= 0) {
            // rotating in a positive direction
            if (position + remainder > 99) {
                zeroes++;
            }
        } else {
            // rotating in a negative direction
            if (position + remainder <= 0) {
                zeroes++;
            }
        }
    }
    
    position = (position + remainder + 100) % 100;
    zeroCount += zeroes;
    // console.log({ rotation, position, zeroes, remainder })
    // console.log("Dial is rotated from", oldPosition.toString().padStart(3, ' '), "by", rotation.toString().padStart(4, ' '), "to", position.toString().padStart(3, ' '), "and points at zero", zeroes, "times");
}

console.log("Found", rotations.length, "rotations");
console.log("Password: " + zeroCount);