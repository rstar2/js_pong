import Player from './Player.js';

export default class PlayerUser extends Player {
    constructor(width, height, color) {
        super(width, height, color);
    }

    move(event, canvas) {
        // just fallow the mouse

        // if the canvas is not scaled (with CSS and style) then only the
        // event.offsetY will work, but if centered or scaled then not
        // this._pos.y = event.offsetY;


        const scale = event.offsetY / event.target.getBoundingClientRect().height;
        this._pos.y = canvas.height * scale;
    }
}