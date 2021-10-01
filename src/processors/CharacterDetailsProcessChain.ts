import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import {
  CharacterDetails,
  RawCharacterDetails,
  valueIsCharacterDetails,
} from "../types";

class CharacterDetailsProcessChain {
  private processors: CharacterDetailsProcessor[] = [];

  chain(processor: CharacterDetailsProcessor): CharacterDetailsProcessChain {
    this.processors.push(processor);
    return this;
  }

  process(input: RawCharacterDetails): CharacterDetails {
    const result = this.processors.reduce((carry, current) => {
      return current.process(carry);
    }, input);

    if (valueIsCharacterDetails(result)) {
      return result;
    } else {
      console.log("result", result);
      throw new Error("Unexpected result type");
    }
  }
}

export default CharacterDetailsProcessChain;
