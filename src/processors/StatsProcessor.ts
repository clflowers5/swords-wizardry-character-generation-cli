import random from "random";
import CharacterDetailsProcessor from "./CharacterDetailsProcessor";
import { CharacterDetails, CharacterStats } from "../types";

class StatsProcessor implements CharacterDetailsProcessor {
  process(input: CharacterDetails): CharacterDetails {
    const result = { ...input };
    if (result.stats) {
      result.stats = StatsProcessor.generateRandomStats();
    }

    return result;
  }

  private static generateRandomStats(): CharacterStats {
    return {
      charisma: StatsProcessor.roll3d6(),
      constitution: StatsProcessor.roll3d6(),
      dexterity: StatsProcessor.roll3d6(),
      intelligence: StatsProcessor.roll3d6(),
      strength: StatsProcessor.roll3d6(),
      wisdom: StatsProcessor.roll3d6(),
    };
  }

  private static roll3d6(): number {
    return random.int(1, 6) + random.int(1, 6) + random.int(1, 6);
  }
}

export default StatsProcessor;
