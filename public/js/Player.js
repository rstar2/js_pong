import Rect from './Rect.js';

export default class Ball extends Rect {
    constructor(width, height) {
        super(width, height);
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

    render(context) {
        context.fillStyle = 'red';
        context.fillRect(this.left, this.top, this._size.x, this._size.y);

        // // draw the center
        // context.fillStyle = 'yellow';
        // context.fillRect(this.pos.x, this.pos.y, 1, 1);
    }
}

