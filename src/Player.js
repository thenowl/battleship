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
  #pendingStrike;
  #pendingCoords;
  #pendingHorizontal;
  #pendingVertical;
  constructor(name = 'Computer') {
    super(name);
    this.#pendingStrike = false;
    this.#pendingCoords = [];
    this.#pendingHorizontal = [];
    this.#pendingVertical = [];
  }

  #randomCoordinateGenerator(shipLength = 0, direction = false) {
    // Randomly determine whether to place the ship horizontally or vertically
    const placeHorizontal = Math.floor() > 0.5 ? 'horizontal' : 'vertical';
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    if (placeHorizontal === 'horizontal') {
      x + shipLength >= 10 ? (x = x - shipLength) : x;
    } else if (placeHorizontal === 'vertical') {
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

  #isValidCoordinate(coord) {
    return (
      coord[0] >= 0 &&
      coord[0] < 10 &&
      coord[1] >= 0 &&
      coord[1] < 10 &&
      this.attackLog[coord[0]][coord[1]] === null
    );
  }

  attack(player) {
    if (this.#pendingStrike) {
      let isHorizontal = false;
      let currentCoordinate;

      if (this.#pendingHorizontal.length) {
        currentCoordinate = this.#pendingHorizontal[0];
        isHorizontal = true;
      } else {
        currentCoordinate = this.#pendingVertical[0];
        isHorizontal = false;
      }

      const attack = player.gameBoard.receiveAttack(
        currentCoordinate[0],
        currentCoordinate[1],
      );

      this.gameBoard.logAttack(
        currentCoordinate[0],
        currentCoordinate[1],
        attack,
      );

      if (attack) {
        if (
          player.gameBoard.gameBoard[currentCoordinate[0]][currentCoordinate[1]]
            .sunk
        ) {
          this.#pendingHorizontal = [];
          this.#pendingVertical = [];
          this.#pendingStrike = false;
        } else {
          if (isHorizontal) {
            // If horizontal strike success push valid horizontal coords
            if (
              this.#isValidCoordinate([
                currentCoordinate[0] + 1,
                currentCoordinate[1],
              ])
            ) {
              this.#pendingHorizontal.push([
                currentCoordinate[0] + 1,
                currentCoordinate[1],
              ]);
            }
            if (
              this.#isValidCoordinate([
                currentCoordinate[0] - 1,
                currentCoordinate[1],
              ])
            ) {
              this.#pendingHorizontal.push([
                currentCoordinate[0] - 1,
                currentCoordinate[1],
              ]);
            }
          } else {
            // If vertical strike success push valid vertical coords
            if (
              this.#isValidCoordinate([
                currentCoordinate[0],
                currentCoordinate[1] + 1,
              ])
            ) {
              this.#pendingVertical.push([
                currentCoordinate[0],
                currentCoordinate[1] + 1,
              ]);
            }
            if (
              this.#isValidCoordinate([
                currentCoordinate[0],
                currentCoordinate[1] - 1,
              ])
            ) {
              this.#pendingVertical.push([
                currentCoordinate[0],
                currentCoordinate[1] - 1,
              ]);
            }
          }
        }
      }
      isHorizontal
        ? this.#pendingHorizontal.shift()
        : this.#pendingVertical.shift();

      return attack;
    } else {
      let x;
      let y;

      do {
        [x, y] = this.#randomCoordinateGenerator();
      } while (this.attackLog[x][y] !== null);

      const attack = player.gameBoard.receiveAttack(x, y);
      this.gameBoard.logAttack(x, y, attack);

      if (attack) {
        this.#pendingStrike = true;
        //Push valid surrounding coords into respective arrays
        if (this.#isValidCoordinate([x + 1, y])) {
          this.#pendingHorizontal.push([x + 1, y]);
        }
        if (this.#isValidCoordinate([x - 1, y])) {
          this.#pendingHorizontal.push([x - 1, y]);
        }
        if (this.#isValidCoordinate([x, y + 1])) {
          this.#pendingVertical.push([x, y + 1]);
        }
        if (this.#isValidCoordinate([x, y - 1])) {
          this.#pendingVertical.push([x, y - 1]);
        }
      }
      return attack;
    }
  }
}

export { RealPlayer, ComputerPlayer };
