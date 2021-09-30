import random from "random";
import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import { CharacterDetails, CharacterStats } from "../types";

class StatsProcessor implements CharacterDetailsProcessor {
  process(input: CharacterDetails): CharacterDetails {
    const result = { ...input };
    if (result.stats) {
      result.stats = this.generateRandomStats();
    }

    return result;
  }

  generateRandomStats(): CharacterStats {
    function roll3d6(): number {
      return random.int(1, 6) + random.int(1, 6) + random.int(1, 6);
    }

    return {
      charisma: roll3d6(),
      constitution: roll3d6(),
      dexterity: roll3d6(),
      intelligence: roll3d6(),
      strength: roll3d6(),
      wisdom: roll3d6(),
    };
  }
}

export default StatsProcessor;
