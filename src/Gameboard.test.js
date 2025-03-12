import { describe, it, expect } from '@jest/globals';
import { Gameboard } from './Gameboard';

describe('Gameboard', () => {
  it('should create a gameboard object', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard).toBeInstanceOf(Gameboard);
  });

  it('should have a gameBoard property', () => {
    const gameBoard = new Gameboard();
    expect(gameBoard.gameBoard).toBeInstanceOf(Array);
  });
});
