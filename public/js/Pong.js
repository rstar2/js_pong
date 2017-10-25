import Timer from './Timer.js';
import Ball from './Ball.js';
import PlayerAI from './PlayerAI.js';
import PlayerUser from './PlayerUser.js';

export default class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._ball = new Ball(5);

        this._players = [
            new PlayerUser(20, 100),
            new PlayerAI(20, 100)
        ];
        this._players[0].pos.x = 40;
        this._players[1].pos.x = canvas.width - 40;
        this._players[0].pos.y = this._players[1].pos.y = canvas.height / 2;

        this._timer = new Timer({
            update: this._update.bind(this), render: this._render.bind(this)
        });

        canvas.addEventListener('mousemove', event => this._players[0].move(event));
        canvas.addEventListener('click', () => this._start());

        this._reset();
    }

    _checkCollision(player) {
        if (player.left < this._ball.right && player.right > this._ball.left &&
            player.top < this._ball.bottom && player.bottom > this._ball.top) {

            // just negate the x direction
            this._ball.vel.x = -this._ball.vel.x;

            if (false) {
                // increase the ball speed if 5% on every paddle touch
                this._ball.vel.len *= 1.05;
            } else {
                // also tweek (fludge factor) the y direction with some randomness
                const len = this._ball.vel.len;
                this._ball.vel.y += 300 * (Math.random() - 0.5);
                this._ball.vel.len = len * 1.05;
            }
        }
    }

    _reset() {
        this._ball.pos.x = this._canvas.width / 2;
        this._ball.pos.y = this._canvas.height / 2;
        this._ball.vel.x = this._ball.vel.y = 0;
    }

    _start() {
        if (this._ball.vel.x === 0 && this._ball.vel.y === 0) {
            // set a random x direction - left/right
            this._ball.vel.x = 300 * (Math.random() > 0.5 ? 1 : -1);

            // tweek the y direction a little
            this._ball.vel.y = 300 * (Math.random() * 2 - 1);

            // this will normalize the combined velocity (x and y) to always be constant
            this._ball.vel.len = 200;
        }
    }

    _update(dt) {
        this._ball.update(dt);

        // check for win
        if (this._ball.left < 0 || this._ball.right > this._canvas.width) {

            // convert the booler true/false to 1/0
            const playerId = +(this._ball.vel.x < 0);
            this._players[playerId].win();

            // center the ball back
            this._reset();
        }

        if (this._ball.top < 0 || this._ball.bottom > this._canvas.height) {
            this._ball.vel.y = -this._ball.vel.y;
        }

        // apply any update on the players
        this._players.forEach(player => player.update(dt, this._ball));

        // check for collisions
        this._players.forEach(player => this._checkCollision(player));
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