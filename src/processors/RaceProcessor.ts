import { CharacterDetailsProcessor } from "./CharacterDetailsProcessor";
import { RACES, RawCharacterDetails } from "../types";

class RaceProcessor extends CharacterDetailsProcessor {
  process(input: RawCharacterDetails): RawCharacterDetails {
    const result = { ...input };
    result.race = this.normalizeAnswerOrGenerateRandom(
      result.race.toLowerCase(),
      RACES
    );
    return result;
  }
}

export { RaceProcessor };
