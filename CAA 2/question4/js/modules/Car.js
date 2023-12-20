import * as consts from '../consts/consts.js';
import { Trigonometry } from '../utils/trigonometry.js';

class Car {
    #carDom;
    #speed = 0;
    #angle = 0;

    constructor(carSelector) {
        this.#carDom = document.querySelector(carSelector);
        this.reset();
    }

    reset() {
        const carWidth = this.#carDom.offsetWidth;
        const carHeight = this.#carDom.offsetHeight;
        this.#carDom.style.left = (consts.TRACK_SIZE / 2) - (carWidth / 2) + 'px';
        this.#carDom.style.top = (consts.TRACK_SIZE / 2) - (carHeight / 2) + 'px';
        this.#speed = 0;
        this.#angle = 0;
        this.#carDom.style.transform = `rotate(${this.#angle}deg)`;
    }

    update(keyList) {
        if (keyList.includes('ArrowUp')) {
            this.#speed += consts.SPEED_UP;
        } else if (keyList.includes('ArrowDown')) {
            this.#speed -= consts.SPEED_DOWN;
        } else {
            this.#speed *= consts.SPEED_INERTIA;
        }

        if (this.#speed > consts.SPEED_LIMIT) {
            this.#speed = consts.SPEED_LIMIT;
        } else if (this.#speed < -consts.SPEED_LIMIT) {
            this.#speed = -consts.SPEED_LIMIT;
        }

        if (keyList.includes('ArrowLeft') && this.#speed > 1) {
            this.#angle -= consts.TURN_AMOUNT;
        }
        if (keyList.includes('ArrowLeft') && this.#speed < -1) {
          this.#angle += consts.TURN_AMOUNT;
        }
        if (keyList.includes('ArrowRight') && this.#speed > 1) {
            this.#angle += consts.TURN_AMOUNT;
        }
        if (keyList.includes('ArrowRight') && this.#speed < -1) {
          this.#angle -= consts.TURN_AMOUNT;
      }

        const carWidth = this.#carDom.offsetWidth;
        const carHeight = this.#carDom.offsetHeight;
        const rad = Trigonometry.toRadians(this.#angle);
        const deltax = this.#speed * Math.cos(rad);
        const deltay = this.#speed * Math.sin(rad);

        let x = parseInt(this.#carDom.style.left) + deltax;
        let y = parseInt(this.#carDom.style.top) + deltay;

        this.#carDom.style.transform = `rotate(${this.#angle}deg)`;
        this.#carDom.style.left = x + 'px';
        this.#carDom.style.top = y + 'px';
        return { x, y, carWidth, carHeight };
    }
}

export { Car };