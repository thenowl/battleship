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

  get attackLog() {
    return this.#gameBoard.attackLog;
  }

  placeShips(shiptType, x, y, direction = 'horizontal') {
    return this.#gameBoard.placeShip(shiptType, x, y, direction);
  }

  attack(player, x, y) {
    const attack = player.#gameBoard.receiveAttack(x, y);
    this.#gameBoard.logAttack(x, y, attack);
    return attack;
  }
}
