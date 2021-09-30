import { CharacterDetails } from "../types";

interface CharacterDetailsProcessor {
  process(input: CharacterDetails): CharacterDetails;
}

export default CharacterDetailsProcessor;
