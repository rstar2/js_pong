import Player from './Player.js';

export default class PlayerAI extends Player {
    constructor(width, height, color) {
        super(width, height, color);
    }

    update(dt, ball) {
        // just fallow the ball
        this._pos.y = ball.pos.y;
    }
}