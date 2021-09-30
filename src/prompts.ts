import inquirer from "inquirer";
import { render as prettyJson } from "prettyjson";
import { nameByRace } from "fantasy-name-generator";

import { CharacterDetails, Race } from "./types";
import { CLASSES, RACE, SEX } from "./constants";
import { writeToFile } from "./write-to-file";
import CharacterDetailsProcessChain from "./processors/CharacterDetailsProcessChain";
import StatsProcessor from "./processors/StatsProcessor";

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
      filter: (val, answers: CharacterDetails) => {
        const { race, sex } = answers;
        return val ? val : nameByRace(normalizeRace(race), { gender: sex });
      },
    },
    {
      type: "confirm",
      name: "stats",
      message: "Generate random stats?",
    },
  ]);

  const processedAnswers = processAnswers(answers);
  const formattedAnswers = formatAnswers(processedAnswers);
  console.log(prettyJson(formattedAnswers));
  await writeToFile(formattedAnswers);
}

/** todo: cf - move things to a utils or similar file */
// todo: cf - make processors for all of the attributes. Cleany clean.

function capitalizeFirstLetter(word: string | null) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

function formatAnswers(data: CharacterDetails) {
  return {
    name: data.name,
    sex: capitalizeFirstLetter(data.sex),
    race: capitalizeFirstLetter(data.race),
    class: capitalizeFirstLetter(data.class),
    stats: data.stats || null,
  };
}

function normalizeAnswerOrGenerateRandom(answer: string, items: string[]) {
  const normalizedAnswer = answer.toLowerCase();
  return isRandomAnswer(normalizedAnswer)
    ? getRandomElementFromList(items).toLowerCase()
    : normalizedAnswer;
}

function getRandomElementFromList<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function isRandomAnswer(answer: string) {
  return answer === "random";
}

function normalizeRace(race: Race) {
  // nameByRace generator does not support half-elf as an input (they aren't _real_ people)
  return race === "half-elf" ? "elf" : race;
}

function processAnswers(answers: CharacterDetails): CharacterDetails {
  return new CharacterDetailsProcessChain()
    .chain(new StatsProcessor())
    .process(answers);
}

// not using, but leaving around bc it's a cool little generic chain util
function chain<T>(...methods: ((data: T) => T)[]): (input: T) => T {
  return (input: T) => {
    return methods.reduce((carry, current) => {
      return current(carry);
    }, input);
  };
}

export { inquirePrompts };
