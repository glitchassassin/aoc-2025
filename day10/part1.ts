import { readInput } from "../utils";

// const lines = readInput('sample.txt').split('\n');
const lines = readInput('input.txt').split('\n');

type Machine = {
    indicators: boolean[];
    buttons: number[][];
    joltageRequirements: number[];
}

function parseMachine(line: string): Machine {
    const indicators = line.match(/([\.\#])+/g)?.[0]?.split('').map(char => char === '#');
    if (!indicators) throw new Error('Invalid machine: no indicators found');
    const buttons = line.match(/\([0-9,]+\)/g)?.map(button => button.slice(1, -1).split(',').map(Number));
    if (!buttons) throw new Error('Invalid machine: no buttons found');
    const joltageRequirements = line.match(/\{([0-9,]+)\}/g)?.at(0)?.slice(1, -1).split(',').map(Number);
    if (!joltageRequirements) throw new Error('Invalid machine: no joltage requirements found');
    return { indicators, buttons, joltageRequirements };
}

const machines = lines.map(parseMachine);

/**
 * Returns true if the button sequence sets up the correct indicators.
 */
function startup(machine: Machine, sequence: number[]): boolean {
    const indicators = Array.from({ length: machine.indicators.length }, (_) => false);
    for (const button of sequence) {
        // Toggle the indicators the button is wired to.
        for (const wires of machine.buttons[button]) {
            indicators[wires] = !indicators[wires];
        }
    }
    // Check if the indicators match the required indicators.
    return indicators.every((indicator, index) => indicator === machine.indicators[index]);
}

function* permutations(buttons: number, presses: number): Generator<number[]> {
    if (presses === 0) {
        yield [];
        return;
    }
    
    for (let button = 0; button < buttons; button++) {
        for (const previous of permutations(buttons, presses - 1)) {
            yield [button, ...previous];
        }
    }
}

let i = 0;
let totalButtonPresses = 0;
for (const machine of machines) {
    outer: for (let presses = 1; presses <= 10; presses++) {
        // console.log(`Machine ${i} trying ${presses} presses`);
        for (const perm of permutations(machine.buttons.length, presses)) {
            if (startup(machine, perm)) {
                console.log(`Machine ${i} took ${perm.length} button presses`);
                totalButtonPresses += perm.length;
                break outer;
            }
        }
    }
    i++;
}

console.log(`Total button presses: ${totalButtonPresses}`);