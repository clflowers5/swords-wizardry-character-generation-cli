import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import { CharacterDetails } from "../types";

class CharacterDetailsProcessChain {
  private processors: CharacterDetailsProcessor[] = [];

  chain(processor: CharacterDetailsProcessor): CharacterDetailsProcessChain {
    this.processors.push(processor);
    return this;
  }

  process(input: CharacterDetails): CharacterDetails {
    return this.processors.reduce((carry, current) => {
      return current.process(carry);
    }, input);
  }
}

export default CharacterDetailsProcessChain;
