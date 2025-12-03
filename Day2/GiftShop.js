import fs from "node:fs";

const ranges = fs.readFileSync("input.csv", "utf8").split(",");

let partOneTotal = 0;
let partTwoTotal = 0;

const isRepeatedHalf = id => id.length % 2 === 0 && id.slice(0, id.length / 2) === id.slice(id.length / 2);

const isRepeatedPattern = (id) => (id + id).slice(1, -1).includes(id);

for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    let partOneCount = 0;
    let partTwoCount = 0;

    for (let i = start; i <= end; i++) {
        let id = String(i);

        // Part 1: repeated halves
        if (isRepeatedHalf(id)) {
            partOneCount++;
            partOneTotal += i;
        }

        // Part 2: repeated pattern
        if (isRepeatedPattern(id)) {
            partTwoCount++
            partTwoTotal += i;
        }

    }

    console.log(`${range} has part one: ${partOneCount}, part two: ${partTwoCount} invalid IDs`);
}

console.log(`Invalid IDs part one total: ${partOneTotal}, part two total: ${partTwoTotal}`);
