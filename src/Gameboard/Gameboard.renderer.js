import { Gameboard } from './Gameboard';
import './Gameboard.styles.css';

export class RenderGameboard {
  constructor() {
    this.gameBoard = this.#init();
  }

  #init() {
    const gameBoard = new Gameboard();
    const renderedGameboard = document.createElement('div');
    renderedGameboard.className = 'gameBoard';

    gameBoard.gameBoard.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        const square = document.createElement('div');
        square.id = `square${cellIndex}${rowIndex}`;
        square.className = 'gameBoardCell';
        renderedGameboard.appendChild(square);
      }),
    );

    return renderedGameboard;
  }
}
