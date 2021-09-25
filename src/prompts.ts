import boxen from "boxen";
import inquirer from "inquirer";
import { render as prettyJson } from "prettyjson";
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
  await new Promise((resolve) => setTimeout(resolve, 1250));
}

async function inquirePrompts(): Promise<void> {
  const answers = await inquirer.prompt([
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

  const formattedAnswers = formatAnswers(answers);
  console.log(prettyJson(formattedAnswers));
}

function capitalizeFirstLetter(word: string | null) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

function formatAnswers(data: Record<string, string>) {
  return {
    name: data.name,
    sex: capitalizeFirstLetter(data.sex),
    race: capitalizeFirstLetter(data.race),
    class: capitalizeFirstLetter(data.class),
  };
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
  // nameByRace generator does not support half-elf as an input (they aren't _real_ people)
  return race === "half-elf" ? "elf" : race;
}

export { displayWelcomeMessage, inquirePrompts };
