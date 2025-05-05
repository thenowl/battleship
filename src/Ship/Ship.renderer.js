import './Ship.styles.css';
import battleshipImg from './assets/Battleship.svg';
import carrierImg from './assets/Carrier.svg';
import destroyerImg from './assets/Destroyer.svg';
import submarineImg from './assets/Submarine.svg';

export class RenderShip {
  #type;
  #length;
  #ship;
  #orientation;

  constructor(ship) {
    this.#type = ship.type;
    this.#length = ship.length;
    this.#ship = this.#init();
    this.#orientation = 'horizontal';
  }

  get ship() {
    return this.#ship;
  }

  #init() {
    const ship = document.createElement('div');
    ship.className = `ship ${this.#type}`;

    for (let i = 0; i < this.#length; i++) {
      const shipCell = document.createElement('div');
      shipCell.className = 'shipCell';
      ship.appendChild(shipCell);
    }

    const shipImg = document.createElement('img');
    shipImg.className = `shipImg ${this.#type}Img`;

    switch (this.#type) {
      case 'carrier':
        shipImg.src = carrierImg;
        break;
      case 'battleship':
        shipImg.src = battleshipImg;
        break;
      case 'destroyer':
        shipImg.src = destroyerImg;
        break;
      case 'submarine':
        shipImg.src = submarineImg;
        break;

      default:
        break;
    }

    ship.appendChild(shipImg);
    return ship;
  }
}
