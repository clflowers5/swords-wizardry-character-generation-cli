import { CharacterDetails } from "./types";
import { CharacterDetailsProcessChain } from "./processors/CharacterDetailsProcessChain";
import { RaceProcessor } from "./processors/RaceProcessor";
import { SexProcessor } from "./processors/SexProcessor";
import { ClassProcessor } from "./processors/ClassProcessor";
import { NameProcessor } from "./processors/NameProcessor";
import { StatsProcessor } from "./processors/StatsProcessor";

function processAnswers(answers: CharacterDetails): CharacterDetails {
  return new CharacterDetailsProcessChain()
    .chain(new RaceProcessor())
    .chain(new SexProcessor())
    .chain(new ClassProcessor())
    .chain(new NameProcessor())
    .chain(new StatsProcessor())
    .process(answers);
}

export { processAnswers };
