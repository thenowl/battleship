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

  it('should have an attack method', () => {
    const player = new Player();
    expect(player.attack).toBeInstanceOf(Function);
  });

  it('attack method should call gameBoard.receiveAttack', () => {
    const player1 = new Player();
    const player2 = new Player();

    const receiveAttack = jest.spyOn(player2.gameBoard, 'receiveAttack');
    player1.attack(player2, 3, 3);
    expect(receiveAttack).toHaveBeenCalledWith(3, 3);
  });

  it('attack method should return the result of gameBoard.receiveAttack', () => {
    const player1 = new Player();
    const player2 = new Player();

    jest.spyOn(player2.gameBoard, 'receiveAttack').mockReturnValue(true);
    expect(player1.attack(player2, 3, 3)).toBe(true);
  });

  it('should take record of missed attacks', () => {
    const player1 = new Player();
    const player2 = new Player();

    player1.attack(player2, 3, 3);
    expect(player1.attackLog[3][3]).toBe('miss');
  });

  it('should take record of successful attacks', () => {
    const player1 = new Player();
    const player2 = new Player();

    player2.placeShips('carrier', 3, 3);

    player1.attack(player2, 3, 3);
    expect(player1.attackLog[3][3]).toBe('hit');
  });
});
