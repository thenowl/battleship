import { Gameboard } from './Gameboard';

export class Player {
  #gameBoard;
  #playerType;
  constructor(playerType = 'real') {
    this.#gameBoard = new Gameboard();
    this.#playerType = playerType;
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  attack(x, y) {
    return this.#gameBoard.receiveAttack(x, y);
  }

  placeShips(shiptType, x, y, direction = 'horizontal') {
    return this.#gameBoard.placeShip(shiptType, x, y, direction);
  }
}
