import './styles.css';
import { initPageLoad } from './GameRenderer/initPageLoad';
import { RenderGameboard } from './Gameboard/Gameboard.renderer';

const gameBoard = new RenderGameboard('attackLog');
const body = document.body;

body.appendChild(gameBoard.gameBoard);
