import boxen from "boxen";
import inquirer from "inquirer";
import { generateWelcomeText } from "./generateFont";
import { nameByRace } from "fantasy-name-generator";
import { Race } from "./types";
import { CLASSES, RACE, SEX } from "./constants";

async function displayWelcomeMessage(): Promise<void> {
  const formattedMessage = await generateWelcomeText();
  const decoratedWelcomeMessage = boxen(formattedMessage, {
    textAlignment: "center",
    borderStyle: "round",
    padding: 1,
  });
  console.log(decoratedWelcomeMessage);
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

async function inquirePrompts(): Promise<void> {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "race",
      message: "Race:",
      choices: [...RACE, "Random"],
      filter: (val) => normalizeAnswerOrGenerateRandom(val, RACE),
    },
    {
      type: "list",
      name: "sex",
      message: "Sex:",
      choices: [...SEX, "Random"],
      filter: (val) => normalizeAnswerOrGenerateRandom(val, SEX),
    },
    {
      type: "list",
      name: "class",
      message: "Class:",
      choices: [...CLASSES, "Random"],
      pageSize: 10,
      filter: (val) => normalizeAnswerOrGenerateRandom(val, CLASSES),
    },
    {
      type: "type",
      name: "name",
      message: "Name: (leave blank for random)",
      filter: (val, answers) => {
        const { race, sex } = answers;
        return val ? val : nameByRace(normalizeRace(race), { gender: sex });
      },
    },
  ]);

  console.log(JSON.stringify(response, null, 2));
}

function normalizeAnswerOrGenerateRandom(answer: string, items: string[]) {
  const normalizedAnswer = answer.toLowerCase();
  return isRandom(normalizedAnswer)
    ? getRandomElement(items).toLowerCase()
    : normalizedAnswer;
}

function getRandomElement<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function isRandom(answer: string) {
  return answer === "random";
}

function normalizeRace(race: Race) {
  return race === "half-elf" ? "elf" : race;
}

export { displayWelcomeMessage, inquirePrompts };
