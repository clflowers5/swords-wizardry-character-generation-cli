import { RawCharacterDetails } from "../types";

abstract class CharacterDetailsProcessor {
  public abstract process(input: RawCharacterDetails): RawCharacterDetails;

  private static isRandomAnswer<T>(answer: string | T) {
    return answer === "random";
  }

  private static getRandomElementFromList<T>(items: readonly T[]) {
    return items[Math.floor(Math.random() * items.length)];
  }

  protected normalizeAnswerOrGenerateRandom<T>(
    answer: T,
    items: readonly T[]
  ): T {
    return CharacterDetailsProcessor.isRandomAnswer(answer)
      ? CharacterDetailsProcessor.getRandomElementFromList(items)
      : answer;
  }
}

export { CharacterDetailsProcessor };
