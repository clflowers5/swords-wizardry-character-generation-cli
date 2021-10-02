// I hate "utils" files. But IDK junk-pile doesn't sound like a good file name either.

import {CharacterDetails, RawCharacterDetails} from "./types";

// not using, but keeping around bc it's a cool little generic chain util.
function chain<T>(...methods: ((data: T) => T)[]): (input: T) => T {
  return (input: T) => {
    return methods.reduce((carry, current) => {
      return current(carry);
    }, input);
  };
}

function capitalizeFirstLetter(word: string | null): string {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

// I don't love this return type, but it works..
function formatAnswers(data: CharacterDetails): RawCharacterDetails {
  return {
    name: data.name,
    sex: capitalizeFirstLetter(data.sex),
    race: capitalizeFirstLetter(data.race),
    class: capitalizeFirstLetter(data.class),
    stats: data.stats || null,
  };
}

export {
  capitalizeFirstLetter,
  chain,
  formatAnswers,
};
