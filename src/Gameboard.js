import { Ship } from './Ship';

export class Gameboard {
  #gameBoard;
  #ships;
  constructor() {
    this.#gameBoard = this.#createGameBoard();
    this.#ships = [];
  }

  #createGameBoard() {
    const gameBoard = [];

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      gameBoard.push(row);
    }
    return gameBoard;
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}
