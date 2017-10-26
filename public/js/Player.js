import Rect from './Rect.js';

export default class Ball extends Rect {
    constructor(width, height, color) {
        super(width, height, color);
        this._score = 0;
    }

    get score() {
        return this._score;
    }

    win() {
        this._score++; 
    }

    update() {
    }
}

