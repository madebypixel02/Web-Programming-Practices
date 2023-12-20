import { Car } from './Car.js';
import { GamePad } from './GamePad.js';
import * as consts from '../consts/consts.js';

class GameApp {
    #livesDom;
    #trackDom;
    #car;
    #lives = consts.INIT_LIVES;
    #keypad;
    #tick;

    constructor(trackSelector, carSelector, livesSelector) {
        this.#livesDom = document.querySelector(livesSelector);
        this.#trackDom = document.querySelector(trackSelector);
        this.#car = new Car(carSelector);
        this.init();
    }

    init() {
        this.#lives = consts.INIT_LIVES;
        this.#trackDom.style.width = consts.TRACK_SIZE + 'px';
        this.#trackDom.style.height = consts.TRACK_SIZE + 'px';
        this.#keypad = new GamePad();
        this.#keypad.init();
        this.#tick = setInterval(() => this.render(), consts.FRAME_RATE);
    }

    render() {
        const keyList = this.#keypad.keyList;
        const { x, y, carHeight, carWidth } = this.#car.update(keyList);

        if (x < 0 || x + carWidth > consts.TRACK_SIZE || y < 0 || y + carWidth > consts.TRACK_SIZE) {
            this.crash();
        }

        this.#livesDom.textContent = this.#lives;

        if (this.#lives === 0) {
            this.finish();
        }
    }

    crash() {
        this.#lives--;
        this.#car.reset();

        if (this.#lives === 0) {
            this.finish();
        }
    }

    finish() {
        clearInterval(this.#tick);
        this.#keypad.destroy();
    }
}

export { GameApp };