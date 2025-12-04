import fs from "node:fs";

const banks = fs.readFileSync("input.csv", "utf8").split("\n").map(bank => bank.trim());

let totalPartOneJoltage = 0;
let totalPartTwoJoltage = 0;

const getLargestBattery = (bank) => [...new Set(bank)].sort().pop();

const getLargestValidBattery = (bank, remaining = 1) => {
    let battery = getLargestBattery(bank);
    let index = bank.indexOf(battery);

    if (index >= bank.length - remaining) {
        const slice = bank.slice(0, bank.length - remaining);
        battery = getLargestBattery(slice);
        index = bank.indexOf(battery);
    }

    return [battery, index];
};

const getLargestJoltagePartOne = (bank) => {
    const [current, index] = getLargestValidBattery(bank);
    const remainingBatteries = bank.slice(index + 1);
    const next = getLargestBattery(remainingBatteries);

    return Number(current + next);
}

const getLargestJoltagePartTwo = (bank, remaining = 12) => {
    if (remaining === 0) return "";

    const [current, index] = getLargestValidBattery(bank, remaining - 1);
    const remainingBatteries = bank.slice(index + 1);
    const next = getLargestJoltagePartTwo(remainingBatteries, remaining - 1);

    return Number(current + next);
}

for (const bank of banks) {
    const partOneJoltage = getLargestJoltagePartOne(bank);
    const partTwoJoltage = getLargestJoltagePartTwo(bank);

    console.log(`In ${bank}, the largest joltage for part one is ${partOneJoltage}, part two: ${partTwoJoltage}`);

    totalPartOneJoltage += partOneJoltage;
    totalPartTwoJoltage += partTwoJoltage;
}

console.log(`The total output joltage part one: ${totalPartOneJoltage}, part two: ${totalPartTwoJoltage}`);
