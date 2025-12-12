import { readInput } from "../utils";

// const lines = readInput('sample.txt').split('\n');
const lines = readInput("input.txt").split("\n");

type Machine = {
  indicators: boolean[];
  buttons: number[][];
  joltageRequirements: number[];
};

function parseMachine(line: string): Machine {
  const indicators = line
    .match(/([\.\#])+/g)?.[0]
    ?.split("")
    .map((char) => char === "#");
  if (!indicators) throw new Error("Invalid machine: no indicators found");
  const buttons = line
    .match(/\([0-9,]+\)/g)
    ?.map((button) => button.slice(1, -1).split(",").map(Number));
  if (!buttons) throw new Error("Invalid machine: no buttons found");
  buttons.sort((a, b) => b.length - a.length);
  const joltageRequirements = line
    .match(/\{([0-9,]+)\}/g)
    ?.at(0)
    ?.slice(1, -1)
    .split(",")
    .map(Number);
  if (!joltageRequirements)
    throw new Error("Invalid machine: no joltage requirements found");
  return { indicators, buttons, joltageRequirements };
}

const machines = lines.map(parseMachine);

function fitJoltage(
  buttons: number[][],
  joltageRequirements: number[]
): number | null {
  // fit buttons
  // max presses is determined by the smallest joltage remaining wired to the current button
  function maxPressesForButton(button: number[]) {
    return Math.min(
      ...button.map((wire) => joltageRequirements[wire])
    );
  }
  const maxPresses = maxPressesForButton(buttons[0]);
  const hypotheticalMinJoltages = buttons.slice(1).map(button => {
    const maxPresses = maxPressesForButton(button);
    return joltageRequirements.map((_, i) => {
        if (button.includes(i)) {
            return maxPresses;
        }
        return 0;
    });
  }).reduce((a, b) => a.map((x, i) => x - b[i]), joltageRequirements);
  const minPresses = Math.max(
    0,
    ...hypotheticalMinJoltages
  );
//   if (minPresses > 0) console.log({
//     remaining: buttons.length,
//     maxPresses,
//     minPresses,
//     joltageRequirements: joltageRequirements
//       .map((joltage, i) =>
//         `${joltage}`.padStart(3, " ")
//       )
//       .join(" "),
//     hypotheticalMinJoltages: hypotheticalMinJoltages
//       .map((joltage, i) =>
//         `${joltage}`.padStart(3, " ")
//       )
//       .join(" "),
//   });
  if (minPresses > maxPresses) {
    return null;
  }
//   if (buttons.length === 12) console.log({ maxPresses, minPresses })
  //   console.log("maxPresses", maxPresses, "minPresses", minPresses);
let bestResult = null;
  for (let i = maxPresses; i >= minPresses; i--) {
    // if (buttons.length === 13) console.log(i, {
    //   remaining: buttons.length,
    //   maxPresses,
    //   minPresses,
    //   joltageRequirements: joltageRequirements
    //     .map((joltage, i) =>
    //       `${joltage}`.padStart(3, " ")
    //     )
    //     .join(" "),
    //   hypotheticalMinJoltages: hypotheticalMinJoltages
    //     .map((joltage, i) =>
    //       `${joltage}`.padStart(3, " ")
    //     )
    //     .join(" "),
    // });
    let workingJoltage = [...joltageRequirements];
    for (const wire of buttons[0]) {
      workingJoltage[wire] -= i;
    }
    if (buttons.length === 1) {
      if (workingJoltage.every((joltage) => joltage === 0)) {
        return i;
      } else {
        return null;
      }
    } else {
      const result = fitJoltage(buttons.slice(1), workingJoltage);
      if (result !== null && (bestResult === null || i + result < bestResult)) {
        bestResult = i + result;
      }
    }
  }
  return bestResult;
}

let totalButtonPresses = 0;
let i = 0;
for (const machine of machines) {
  const result = fitJoltage(machine.buttons, machine.joltageRequirements);
  if (result !== null) {
    console.log(`Machine ${i} took ${result} button presses`);
    totalButtonPresses += result;
  } else {
    throw new Error(`Could not calculate joltage for machine ${i}`);
  }
  i++;
}
console.log(`Total button presses: ${totalButtonPresses}`);
