import { nameByRace } from "fantasy-name-generator";
import { CharacterDetailsProcessor } from "./CharacterDetailsProcessor";
import { CharacterDetails, Race } from "../types";

class NameProcessor extends CharacterDetailsProcessor {
  process(input: CharacterDetails): CharacterDetails {
    const result = { ...input };

    if (!result.name) {
      const generatedName = nameByRace(
        NameProcessor.normalizeRace(result.race),
        { gender: result.sex }
      );

      // Silliness
      if (typeof generatedName === "string") {
        result.name = generatedName;
      } else {
        // Will be an Error in this case
        throw generatedName;
      }
    }

    return result;
  }

  private static normalizeRace(race: Race) {
    // nameByRace generator does not support half-elf as an input (they aren't _real_ people)
    return race === "half-elf" ? "elf" : race;
  }
}

export { NameProcessor };
