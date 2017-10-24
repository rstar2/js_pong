import Vector from './Vector.js';

export default class Rect {
    constructor(width, height) {
        this._pos = new Vector();
        this._size = new Vector(width, height);
    }

    get pos() {
        return this._pos;
    }

    get size() {
        return this._size;
    }

    get left() {
        return this._pos.x - this._size.x/2;
    }

    get right() {
        return this._pos.x + this._size.x/2;
    }

    get top() {
        return this._pos.y - this._size.y/2;
    }

    get bottom() {
        return this._pos.y + this._size.y;
    }
}