export class Ship {
  #length;
  #hitsTaken;
  #sunk;
  constructor(length) {
    this.#length = length;
    this.#hitsTaken = 0;
    this.#sunk = false;
  }

  get length() {
    return this.#length;
  }

  get hitsTaken() {
    return this.#hitsTaken;
  }

  get sunk() {
    return this.#sunk;
  }

  hit() {
    this.#hitsTaken++;
    this.isSunk();
  }

  isSunk() {
    if (this.#hitsTaken === this.#length) {
      this.#sunk = true;
    }
  }
}
