import { readInput } from "../utils";

// const input = readInput('sample.txt');
const input = readInput('input.txt');
const lines = input.split('\n');

function solveProblem(problem: number[], operator: "+" | "*") {
    if (operator === "+") {
        const result = problem.reduce((acc, num) => acc + num, 0);
        console.log(`${problem.join(' + ')} = ${result}`);
        return result;
    } else {
        const result = problem.reduce((acc, num) => acc * num, 1);
        console.log(`${problem.join(' * ')} = ${result}`);
        return result;
    }
}

let problem: number[] = [];
let operator: "+" | "*" = "+";
let sum = 0;
for (let i = lines[0].length - 1; i >= 0; i--) {
    if (lines.every(line => line[i] === " ")) {
        // problem separator - solve problem
        sum += solveProblem(problem, operator);
        problem = [];
        continue;
    }
    // Read number from column
    const num = Number(lines.slice(0, -1).map(line => line[i]).join('').trim());
    if (isNaN(num)) {
        throw new Error(`Invalid number: ${lines.map(line => line[i]).join('').trim()}`);
    }
    problem.push(num);
    // Read operator, if it exists
    if (lines.at(-1)?.[i] === "+") operator = "+";
    else if (lines.at(-1)?.[i] === "*") operator = "*";
}

// solve last problem
sum += solveProblem(problem, operator);

console.log("Answer:", sum);