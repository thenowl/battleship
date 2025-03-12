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

  it('receiveAttack method should return true if a ship is hit', () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip('destroyer', 3, 3, 'horizontal');
    expect(gameBoard.receiveAttack(3, 3)).toBe(true);
  });

  it('receiveAttack method should return false if a ship is not hit', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.receiveAttack(3, 3)).toBe(false);
  });

  it('receiveAttack method should hit a ship', () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip('destroyer', 3, 3, 'horizontal');
    gameBoard.receiveAttack(3, 3);
    expect(gameBoard.gameBoard[3][3].hitsTaken).toBe(1);
  });

  it('receiveAttack method should return false if a ship is already hit', () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip('destroyer', 3, 3, 'horizontal');
    gameBoard.receiveAttack(3, 3);
    expect(gameBoard.receiveAttack(3, 3)).toBe(false);
  });

  it('receiveAttack method should sink a ship', () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip('destroyer', 3, 3, 'horizontal');
    gameBoard.receiveAttack(3, 3);
    gameBoard.receiveAttack(3, 4);
    gameBoard.receiveAttack(3, 5);
    expect(gameBoard.gameBoard[3][3].hitsTaken).toBe(3);
    expect(gameBoard.gameBoard[3][3].sunk).toBe(true);
  });

  it('should take record of missed attacks', () => {
    const gameBoard = new Gameboard();
    gameBoard.receiveAttack(3, 3);
    expect(gameBoard.missedAttacks[3][3]).toBe('miss');
  });
});
