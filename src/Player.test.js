import { describe, it, expect, jest } from '@jest/globals';
import { Gameboard } from './Gameboard';
import { RealPlayer, ComputerPlayer } from './Player';

describe('Player', () => {
  it('should create a "real" player object with name Steve', () => {
    const player = new RealPlayer('Steve');
    expect(player).toBeInstanceOf(RealPlayer);
    expect(player.name).toBe('Steve');
  });

  it('should create a "computer" player object', () => {
    const player = new ComputerPlayer();
    expect(player).toBeInstanceOf(ComputerPlayer);
    expect(player.name).toBe('Computer');
  });

  it('should have a gameBoard property', () => {
    const player = new RealPlayer();
    expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });

  it('should have a placeShips method', () => {
    const player = new RealPlayer();
    expect(player.placeShips).toBeInstanceOf(Function);
  });

  it('placeShips method should call gameBoard.placeShip', () => {
    const player = new RealPlayer();

    const placeShip = jest.spyOn(player.gameBoard, 'placeShip');
    player.placeShips('carrier', 3, 3);
    expect(placeShip).toHaveBeenCalled();
  });

  it('placeShips method should place a ship on the gameBoard', () => {
    const player = new RealPlayer();

    player.placeShips('carrier', 3, 3);
    expect(player.gameBoard.ships.length).toBe(1);
    expect(player.gameBoard.ships[0].length).toBe(5);
  });

  it('placeShips method should place all computer ships on the gameBoard', () => {
    const player = new ComputerPlayer();

    player.placeShips();
    expect(player.gameBoard.ships.length).toBe(10);
  });

  it('should have an attack method', () => {
    const player = new RealPlayer();
    expect(player.attack).toBeInstanceOf(Function);
  });

  it('attack method should call gameBoard.receiveAttack', () => {
    const player1 = new RealPlayer();
    const player2 = new RealPlayer();

    const receiveAttack = jest.spyOn(player2.gameBoard, 'receiveAttack');
    player1.attack(player2, 3, 3);
    expect(receiveAttack).toHaveBeenCalledWith(3, 3);
  });

  it('attack method should return the result of gameBoard.receiveAttack', () => {
    const player1 = new RealPlayer();
    const player2 = new RealPlayer();

    jest.spyOn(player2.gameBoard, 'receiveAttack').mockReturnValue(true);
    expect(player1.attack(player2, 3, 3)).toBe(true);
  });

  it('should take record of missed attacks', () => {
    const player1 = new RealPlayer();
    const player2 = new RealPlayer();

    player1.attack(player2, 3, 3);
    expect(player1.attackLog[3][3]).toBe('miss');
  });

  it('should take record of successful attacks', () => {
    const player1 = new RealPlayer();
    const player2 = new RealPlayer();

    player2.placeShips('carrier', 3, 3);

    player1.attack(player2, 3, 3);
    expect(player1.attackLog[3][3]).toBe('hit');
  });
});
