import { Gameboard } from './Gameboard';

class Player {
  gameBoard;
  #name;
  constructor(name) {
    this.gameBoard = new Gameboard();
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get gameBoard() {
    return this.gameBoard;
  }

  get attackLog() {
    return this.gameBoard.attackLog;
  }
}

class RealPlayer extends Player {
  constructor(name) {
    super(name);
  }

  placeShips(shiptType, x, y, direction = 'horizontal') {
    return this.gameBoard.placeShip(shiptType, x, y, direction);
  }

  attack(player, x, y) {
    const attack = player.gameBoard.receiveAttack(x, y);
    this.gameBoard.logAttack(x, y, attack);
    return attack;
  }
}

class ComputerPlayer extends Player {
  constructor(name = 'Computer') {
    super(name);
  }

  #randomCoordinateGenerator(shipLength = 0, direction = false) {
    // Randomly determine whether to place the ship horizontally or vertically
    const placeHorizontal = Math.floor() > 0.5 ? 'horizontal' : 'vertical';
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    if (placeHorizontal === 'horizontal') {
      x + shipLength >= 10 ? (x = x - shipLength) : x;
    } else {
      y + shipLength >= 10 ? (y = y - shipLength) : y;
    }
    return [x, y, placeHorizontal];
  }

  placeShips() {
    while (this.gameBoard.shipClasses.length > 0) {
      const coordsDirection = this.#randomCoordinateGenerator();
      this.gameBoard.placeShip(
        this.gameBoard.shipClasses[0][1],
        coordsDirection[0],
        coordsDirection[1],
        coordsDirection[2],
      );
    }
  }

  attack() {}
}

export { RealPlayer, ComputerPlayer };
