import Vector from './Vector.js';
import Rect from './Rect.js';

export default class Ball extends Rect {
    constructor(size) {
        super(size, size);
        this._vel = new Vector();
    }

    get vel() {
        return this._vel;
    }

    update(dt) {
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }

    render(context) {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI);
        context.fill();
    }
}

