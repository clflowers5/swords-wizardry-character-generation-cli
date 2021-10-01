import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import { PROFESSIONS, RawCharacterDetails } from "../types";

class ClassProcessor extends CharacterDetailsProcessor {
  process(input: RawCharacterDetails): RawCharacterDetails {
    const result = { ...input };
    result.class = this.normalizeAnswerOrGenerateRandom(
      result.class.toLowerCase(),
      PROFESSIONS
    );
    return result;
  }
}

export default ClassProcessor;
