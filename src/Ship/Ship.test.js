import { describe, it, expect } from '@jest/globals';
import { Ship } from './Ship';

describe('Ship', () => {
  it('should create a ship object', () => {
    const ship = new Ship(4, 'battleship');
    expect(ship).toBeInstanceOf(Ship);
  });

  it('should have a length property', () => {
    const ship = new Ship(4, 'battleship');
    expect(ship.length).toBe(4);
  });

  it('should have a type property', () => {
    const ship = new Ship(4, 'battleship');
    expect(ship.type).toBe('battleship');
  });

  it('should have a hitsTaken property', () => {
    const ship = new Ship(4, 'battleship');
    expect(ship.hitsTaken).toBe(0);
  });

  it('should have a sunk property', () => {
    const ship = new Ship(4, 'battleship');
    expect(ship.sunk).toBe(false);
  });

  it('should increment hitsTaken when hit', () => {
    const ship = new Ship(4, 'battleship');
    ship.hit();
    expect(ship.hitsTaken).toBe(1);
    expect(ship.sunk).toBe(false);
  });

  it('should set sunk to true when hitsTaken equals length', () => {
    const ship = new Ship(4, 'battleship');
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hitsTaken).toBe(4);
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });
});
