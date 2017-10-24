import Timer from './Timer.js';
import Ball from './Ball.js';
import Player from './Player.js';

export default class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._ball = new Ball(5);
        this._ball.pos.x = canvas.width / 2;
        this._ball.pos.y = canvas.height / 2;
        this._ball.vel.x = this._ball.vel.y = 100;

        this._players = [
            new Player(20, 100),
            new Player(20, 100)
        ];
        this._players[0].pos.x = 40;
        this._players[1].pos.x = canvas.width - 40;
        this._players[0].pos.y = this._players[1].pos.y = canvas.height / 2;

        this._timer = new Timer({
            update: this._update.bind(this), render: this._render.bind(this)
        });
    }

    _update(dt) {
        this._ball.update(dt);

        if (this._ball.left < 0 || this._ball.right > this._canvas.width) {
            this._ball.vel.x = -this._ball.vel.x;
        }

        if (this._ball.top < 0 || this._ball.bottom > this._canvas.height) {
            this._ball.vel.y = -this._ball.vel.y;
        }
    }

    _render() {
        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._players.forEach(player => player.render(this._context));

        this._ball.render(this._context);
    }

    start() {
        this._timer.start();
    }
}