import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import { RawCharacterDetails, SEXES } from "../types";

class SexProcessor extends CharacterDetailsProcessor {
  process(input: RawCharacterDetails): RawCharacterDetails {
    const result = { ...input };
    result.sex = this.normalizeAnswerOrGenerateRandom(
      result.sex.toLowerCase(),
      SEXES
    );
    return result;
  }
}

export default SexProcessor;
