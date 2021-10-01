import inquirer from "inquirer";
import { render as prettyJson } from "prettyjson";

import { CharacterDetails } from "./types";
import { CLASSES, RACE, SEX } from "./constants";
import { writeToFile } from "./write-to-file";
import CharacterDetailsProcessChain from "./processors/CharacterDetailsProcessChain";
import StatsProcessor from "./processors/StatsProcessor";
import NameProcessor from "./processors/NameProcessor";
import ClassProcessor from "./processors/ClassProcessor";
import SexProcessor from "./processors/SexProcessor";
import RaceProcessor from "./processors/RaceProcessor";

async function inquirePrompts(): Promise<void> {
  const answers = await inquirer.prompt<CharacterDetails>([
    {
      type: "list",
      name: "race",
      message: "Race:",
      choices: [...RACE, "Random"],
    },
    {
      type: "list",
      name: "sex",
      message: "Sex:",
      choices: [...SEX, "Random"],
    },
    {
      type: "list",
      name: "class",
      message: "Class:",
      choices: [...CLASSES, "Random"],
      pageSize: 10,
    },
    {
      type: "type",
      name: "name",
      message: "Name: (leave blank for random)",
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

function processAnswers(answers: CharacterDetails): CharacterDetails {
  return new CharacterDetailsProcessChain()
    .chain(new RaceProcessor())
    .chain(new SexProcessor())
    .chain(new ClassProcessor())
    .chain(new NameProcessor())
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
