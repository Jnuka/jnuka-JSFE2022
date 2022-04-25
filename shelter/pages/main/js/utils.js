import { Pet } from "./class.pet.js";

export function shuffleArray(arr) {
  let array = [...arr];
  for (var i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

export function convertJsonEntitiesToPets(jsonList) {
  return jsonList.map(json => new Pet(json));
}