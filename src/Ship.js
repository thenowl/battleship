export default class Ship {
  #length;
  #hitsTaken;
  #sunk;
  constructor(length) {
    this.#length = length;
    this.#hitsTaken = 0;
    this.#sunk = false;
  }
}
