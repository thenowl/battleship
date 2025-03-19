import { Ship } from '../Ship/Ship';

export class Gameboard {
  #gameBoard;
  #attackLog;
  #ships;
  #shipClasses;
  constructor() {
    this.#gameBoard = this.#createGameBoard();
    this.#attackLog = this.#createGameBoard();
    this.#ships = [];
    this.#shipClasses = [
      [5, 'carrier'],
      [4, 'battleship'],
      [4, 'battleship'],
      [3, 'destroyer'],
      [3, 'destroyer'],
      [3, 'destroyer'],
      [2, 'submarine'],
      [2, 'submarine'],
      [2, 'submarine'],
      [2, 'submarine'],
    ];
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

  get attackLog() {
    return this.#attackLog;
  }

  get shipClasses() {
    return this.#shipClasses;
  }

  get ships() {
    return this.#ships;
  }

  #isShipPlacementValid(ship, x, y, direction) {
    const shipLength = ship.length;
    const horizontalGameboardLength = this.#gameBoard[0].length;
    const verticalGameboardLength = this.#gameBoard.length;

    if (direction === 'horizontal') {
      if (y + shipLength > horizontalGameboardLength) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.#gameBoard[x][y + i] !== null) {
          return false;
        }
      }
    } else {
      if (x + shipLength > verticalGameboardLength) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.#gameBoard[x + i][y] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(shipClass, x, y, direction) {
    const type = this.#shipClasses.find((ship) => ship[1] === shipClass);
    const ship = new Ship(type[0], type[1]);

    if (this.#isShipPlacementValid(ship, x, y, direction)) {
      this.#shipClasses.splice(this.#shipClasses.indexOf(type), 1);
      this.#ships.push(ship);
      const shipLength = ship.length;
      for (let i = 0; i < shipLength; i++) {
        if (direction === 'horizontal') {
          this.#gameBoard[x][y + i] = ship;
        } else {
          this.#gameBoard[x + i][y] = ship;
        }
      }
      return true;
    }
    return false;
  }

  receiveAttack(x, y) {
    if (this.#gameBoard[x][y] !== null) {
      this.#gameBoard[x][y].hit();
      return true;
    }
    return false;
  }

  logAttack(x, y, attack) {
    attack ? (this.#attackLog[x][y] = 'hit') : (this.#attackLog[x][y] = 'miss');
  }

  allShipsSunk() {
    return this.#ships.every((ship) => ship.sunk);
  }
}
