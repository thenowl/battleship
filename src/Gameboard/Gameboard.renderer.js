import { Gameboard } from './Gameboard';
import { Ship } from '../Ship/Ship';
import './Gameboard.styles.css';

export class RenderGameboard {
  #type;
  #gameBoard;

  constructor(type) {
    this.#type = type;
    this.#gameBoard = this.#init();
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  #init() {
    const gameBoard = new Gameboard();
    const renderedGameboard = document.createElement('div');
    renderedGameboard.className = 'gameBoard';

    gameBoard.gameBoard.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        const square = document.createElement('div');
        square.id = `square${cellIndex}${rowIndex}`;

        this.#type === 'gameBoard'
          ? (square.className = 'gameBoardCell')
          : (square.className = 'attackLogCell');

        renderedGameboard.appendChild(square);
      }),
    );

    if (this.#type === 'gameBoard') {
      renderedGameboard.addEventListener('click', (event, ship, direction) => {
        this.#placeShip(event, ship, direction);
      });
    } else {
      renderedGameboard.addEventListener('click', (event) => {
        this.#attack(event);
      });
    }

    return renderedGameboard;
  }

  #placeShip(event, ship, direction = 'horizontal') {
    const target = event.target.id;

    if (!target) return;

    const x = target.charAt(7);
    const y = target.charAt(8);
    const shipClass = ship.type;

    const placeShip = this.#gameBoard.placeShip(shipClass, x, y, direction);

    if (placeShip) {
      const newShip = new RenderShip(ship);

      console.log(this.#gameBoard);
    }
  }

  #attack(event) {
    const target = event.target.id;

    if (!target) return;

    const x = target.charAt(7);
    const y = target.charAt(8);
  }

  renderReceiveAttack() {}
}
