import { Ship } from './Ship';

export class Gameboard {
  #gameBoard;
  #hits;
  #missedAttacks;
  #ships;
  #shipClasses;
  constructor() {
    this.#gameBoard = this.#createGameBoard();
    this.#hits = this.#createGameBoard();
    this.#missedAttacks = this.#createGameBoard();
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

  get missedAttacks() {
    return this.#missedAttacks;
  }

  get ships() {
    return this.#ships;
  }

  #isShipPlacementValid(ship, x, y, direction) {
    const shipLength = ship.length;

    if (direction === 'horizontal') {
      if (x + shipLength > 10) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.#gameBoard[y][x + i] !== null) {
          return false;
        }
      }
    } else {
      if (y + shipLength > 10) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.#gameBoard[y + i][x] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(shipClass, x, y, direction) {
    const type = this.#shipClasses.find((ship) => ship[1] === shipClass);
    const ship = new Ship(type[0]);
    this.#shipClasses.splice(this.#shipClasses.indexOf(type), 1);

    if (this.#isShipPlacementValid(ship, x, y, direction)) {
      this.#ships.push(ship);
      const shipLength = ship.length;
      for (let i = 0; i < shipLength; i++) {
        if (direction === 'horizontal') {
          this.#gameBoard[y][x + i] = ship;
        } else {
          this.#gameBoard[y + i][x] = ship;
        }
      }
      return true;
    }
    return false;
  }

  receiveAttack(x, y) {
    if (this.#gameBoard[x][y] !== null) {
      if (this.#hits[x][y] === 'hit') {
        return false;
      }
      this.#gameBoard[x][y].hit();
      this.#hits[x][y] = 'hit';
      return true;
    }
    this.#missedAttacks[x][y] = 'miss';
    return false;
  }

  allShipsSunk() {
    return this.#ships.every((ship) => ship.sunk);
  }
}
