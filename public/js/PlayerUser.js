import Player from './Player.js';

export default class PlayerUser extends Player {
    constructor(width, height) {
        super(width, height);
    }

    move(event) {
        // TODO: 
        // just fallow the mouse
        this._pos.y = event.offsetY;
    }
}