export default class Vector {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get len() {
        // return the length of the hypotenuse
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    set len(value) {
        // set new length
        const factor = value / this.len;
        this._x *= factor;
        this._y *= factor;
    }
}