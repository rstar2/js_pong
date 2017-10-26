import Vector from './Vector.js';

export default class Rect {
    constructor(width, height, color='white') {
        this._pos = new Vector();
        this._size = new Vector(width, height);
        this._color = color;
    }

    get pos() {
        return this._pos;
    }

    get size() {
        return this._size;
    }

    get left() {
        return this._pos.x - this._size.x / 2;
    }

    get right() {
        return this._pos.x + this._size.x / 2;
    }

    get top() {
        return this._pos.y - this._size.y / 2;
    }

    get bottom() {
        return this._pos.y + this._size.y / 2;
    }
    
    render(context) {
        context.fillStyle = this._color;
        context.fillRect(this.left, this.top, this._size.x, this._size.y);

        // // draw the center
        // context.fillStyle = 'yellow';
        // context.fillRect(this.pos.x, this.pos.y, 1, 1);
    }
}