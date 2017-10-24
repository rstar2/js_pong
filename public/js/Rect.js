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
}