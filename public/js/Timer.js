export default class Timer {
    
    constructor(callbacks, rate = 1 / 60) {
        this._callbacks = callbacks;
        this._rate = rate;

        this._lastTime = 0;
        this._accumulator = 0;
        this._tick = 0;
        this._lastTick = 0;
        this._frameId = null;

    }
    // thus we can set any desired rate
    // in order to get more realistic game simulation
    // Note - this does not mean that the rendering/drawing needs to be
    // with the same rate - THIS IS NOT NEEDED.
    // Waht is needed is to have a deterministic game simulation
    // (checks for collisions and etc.)
    _loop(time) {
        if (this._lastTime) {
            this._accumulator += this._accumulator + (time - this._lastTime) / 1000;
            while (this._accumulator > this._rate) {
                this._callbacks.update(this._rate, this._tick++);
                this._accumulator -= this._rate;
            }
        }
        this._lastTime = time;
        // render only if at least once 'update' is called
        if (this._lastTick !== this._tick) {
            this._callbacks.render();
        }
        this._lastTick = this._tick;
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    start() {
        this._lastTime = null;
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    stop() {
        cancelAnimationFrame(this._frameId);
    }

}

// USAGE :
// import Timer from './Timer.js'