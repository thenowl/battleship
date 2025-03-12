import { describe, it, expect } from '@jest/globals';
import { Gameboard } from './Gameboard';
import { Ship } from './Ship';

describe('Gameboard', () => {
  it('should create a gameboard object', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard).toBeInstanceOf(Gameboard);
  });

  it('should have a gameBoard property', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.gameBoard).toBeInstanceOf(Array);
  });

  it('should have a ships property', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.ships).toBeInstanceOf(Array);
  });

  it('should have a placeShip method', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.placeShip).toBeInstanceOf(Function);
  });

  it('placeShip method should place a ship', () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip('destroyer', 3, 3, 'horizontal');
    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.ships[0].length).toBe(3);
    expect(gameBoard.gameBoard[3][3]).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[3][4]).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[3][5]).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[3][6]).toBe(null);
  });

  it('should have a receiveAttack method', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.receiveAttack).toBeInstanceOf(Function);
  });
});
