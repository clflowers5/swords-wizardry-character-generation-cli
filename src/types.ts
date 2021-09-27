export type Race = "elf" | "dwarf" | "human" | "halfling" | "half-elf";
export type Sex = "male" | "female";
// profession === class
export type Profession =
  | "assassin"
  | "cleric"
  | "druid"
  | "fighter"
  | "magic-user"
  | "monk"
  | "paladin"
  | "ranger"
  | "thief";

export type CharacterDetails = {
  name: string;
  sex: Sex;
  race: Race;
  class: Profession;
};
