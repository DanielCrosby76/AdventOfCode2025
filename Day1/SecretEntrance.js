import fs from "node:fs";

const turns = fs.readFileSync("input.csv", "utf8").split("\n");

const DIAL_START = 0;
const DIAL_END = 99;

let pointer = 50;
let partOnePassword = 0;
let partTwoPassword = 0;

const rotate = (count, delta) => {
    for (let i = 0; i < count; i++) {
        pointer += delta;

        if (pointer > DIAL_END) pointer = DIAL_START;
        else if (pointer < DIAL_START) pointer = DIAL_END;

        // Part 2: How many times the dial touches and stops on zero
        if (pointer === DIAL_START) partTwoPassword++;
    }
}

for (const turn of turns) {
    const direction = turn[0];
    const count = Number(turn.slice(1));
    const delta = direction === "R" ? 1 : -1;

    rotate(count, delta);

    console.log(`The dial is rotated ${turn.trim()} to point at ${pointer}`);

    // Part 1: How many times the dial stops on zero
    if (pointer === 0) partOnePassword++;
};

console.log(`Part one password: ${partOnePassword}, Part two password: ${partTwoPassword}`);
