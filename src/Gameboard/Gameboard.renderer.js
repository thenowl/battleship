import { Gameboard } from './Gameboard';
import './Gameboard.styles.css';

export class RenderGameboard {
  #gameBoard;
  #type;
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

    renderedGameboard.addEventListener('click', (e) => {
      const target = e.target.id;

      if (!target) return;

      // ADD CODE HERE
    });

    return renderedGameboard;
  }
}
