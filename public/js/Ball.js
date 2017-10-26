import Vector from './Vector.js';
import Rect from './Rect.js';

const AS_CIRCLE = true;
export default class Ball extends Rect {
    constructor(size, color) {
        if (AS_CIRCLE) {
            size = (size / 2) | 0;
        }

        super(size, size, color);

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
        // draw as circle
        if (AS_CIRCLE) {
            context.fillStyle = this._color;
            context.beginPath();
            context.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI);
            context.fill();
        } else {
            super.render(context);
        }
    }
}

