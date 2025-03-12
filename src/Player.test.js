import { describe, it, expect, jest } from '@jest/globals';
import { Player } from './Player';
import { Gameboard } from './Gameboard';

describe('Player', () => {
  it('should create a player object', () => {
    const player = new Player();
    expect(player).toBeInstanceOf(Player);
  });

  it('should have a gameBoard property', () => {
    const player = new Player();
    expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });

  it('should have an attack method', () => {
    const player = new Player();
    expect(player.attack).toBeInstanceOf(Function);
  });

  it('attack method should call gameBoard.receiveAttack', () => {
    const player = new Player();

    const receiveAttack = jest.spyOn(player.gameBoard, 'receiveAttack');
    player.attack(3, 3);
    expect(receiveAttack).toHaveBeenCalledWith(3, 3);
  });

  it('attack method should return the result of gameBoard.receiveAttack', () => {
    const player = new Player();

    jest.spyOn(player.gameBoard, 'receiveAttack').mockReturnValue(true);
    expect(player.attack(3, 3)).toBe(true);
  });

  it('attack method should return the result of gameBoard.receiveAttack', () => {
    const player = new Player();

    jest.spyOn(player.gameBoard, 'receiveAttack').mockReturnValue(false);
    expect(player.attack(3, 3)).toBe(false);
  });

  it('should have a placeShips method', () => {
    const player = new Player();
    expect(player.placeShips).toBeInstanceOf(Function);
  });

  it('placeShips method should call gameBoard.placeShip', () => {
    const player = new Player();

    const placeShip = jest.spyOn(player.gameBoard, 'placeShip');
    player.placeShips('carrier', 3, 3);
    expect(placeShip).toHaveBeenCalled();
  });

  it('placeShips method should place a ship on the gameBoard', () => {
    const player = new Player();

    player.placeShips('carrier', 3, 3);
    expect(player.gameBoard.ships.length).toBe(1);
    expect(player.gameBoard.ships[0].length).toBe(5);
  });
});
