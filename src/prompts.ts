import inquirer from "inquirer";

import { CharacterDetails } from "./types";
import { CLASSES, RACE, SEX } from "./constants";

async function displayPrompts(): Promise<CharacterDetails> {
  return inquirer.prompt<CharacterDetails>([
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
}

export { displayPrompts };
