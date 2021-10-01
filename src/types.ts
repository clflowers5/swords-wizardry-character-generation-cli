export const RACES = ["elf", "dwarf", "human", "halfling", "half-elf"] as const;
export type Race = typeof RACES[number];

export const SEXES = ["male", "female"] as const;
export type Sex = typeof SEXES[number];

// profession === class
export const PROFESSIONS = [
  "assassin",
  "cleric",
  "druid",
  "fighter",
  "magic-user",
  "monk",
  "paladin",
  "ranger",
  "thief",
] as const;
export type Profession = typeof PROFESSIONS[number];

export type CharacterDetails = {
  name: string;
  sex: Sex;
  race: Race;
  class: Profession;
  stats: CharacterStats;
};

export type RawCharacterDetails = {
  name: string;
  sex: string;
  race: string;
  class: string;
  stats: CharacterStats;
};

export type CharacterStats = {
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  strength: number;
  wisdom: number;
};

/* Type Guards */
export function valueIsRace(value: unknown): value is Race {
  return RACES.includes(value as Race);
}

export function valueIsProfession(value: unknown): value is Profession {
  return PROFESSIONS.includes(value as Profession);
}

export function valueIsSex(value: unknown): value is Sex {
  return SEXES.includes(value as Sex);
}

export function valueIsStats(
  value: Record<string, unknown>
): value is CharacterStats {
  return (
    typeof value.charisma === "number" &&
    typeof value.constitution === "number" &&
    typeof value.dexterity === "number" &&
    typeof value.intelligence === "number" &&
    typeof value.wisdom === "number" &&
    typeof value.strength === "number"
  );
}

export function valueIsCharacterDetails(
  // yes, we're disabling eslint. This is a type guard. It's fine.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>
): value is CharacterDetails {
  return (
    valueIsProfession(value.class) &&
    valueIsSex(value.sex) &&
    valueIsRace(value.race) &&
    valueIsStats(value.stats)
  );
}
