export class Ship {
  #length;
  #type;
  #hitsTaken;
  #sunk;
  constructor(length, type) {
    this.#length = length;
    this.#type = type;
    this.#hitsTaken = 0;
    this.#sunk = false;
  }

  get length() {
    return this.#length;
  }

  get type() {
    return this.#type;
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
