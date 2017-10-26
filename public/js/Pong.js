import Timer from './Timer.js';
import Ball from './Ball.js';
import PlayerAI from './PlayerAI.js';
import PlayerUser from './PlayerUser.js';

/*
  0     1     2     3  .....  9
 --------------------------------
 111   010   111   111        111
 101   010   001   001        101
 101   010   111   111        111
 101   010   100   001        001
 111   010   111   111        111

 --------------------------------

 These are 5x3 matrixes, which can be flattened to:

 0 => '111101101101111'
 1 => '010010010010010',
 ....
*/
const DIGITS_CHARS = [
    '111101101101111',
    '010010010010010',
    '111001111100111',
    '111001111001111',
    '101101111001001',
    '111100111001111',
    '111100111101111',
    '111001001001001',
    '111101111101111',
    '111101111001111'
];
const DIGITS_CHAR_PIXELS = 10;
// so each digit canvas will be 30x50 pixels width/height
// and thus each char in it will be 10 pixels
const DIGITS = DIGITS_CHARS.map(str => {
    const digit = document.createElement('canvas');
    digit.width = 3 * DIGITS_CHAR_PIXELS;
    digit.height = 5 * DIGITS_CHAR_PIXELS;
    const ctx = digit.getContext('2d');
    ctx.fillStyle = '#fff';
    str.split('').forEach((char, index) => {
        if (char === '1') {
            ctx.fillRect((index % 3) * DIGITS_CHAR_PIXELS,
                (index / 3 | 0) * DIGITS_CHAR_PIXELS,
                DIGITS_CHAR_PIXELS, DIGITS_CHAR_PIXELS);
        }
    });
    return digit;
});

export default class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._ball = new Ball(10);

        this._players = [
            new PlayerUser(20, 100, 'red'),
            new PlayerAI(20, 100, 'green')
        ];
        this._players[0].pos.x = 40;
        this._players[1].pos.x = canvas.width - 40;
        this._players[0].pos.y = this._players[1].pos.y = canvas.height / 2;

        this._timer = new Timer({
            update: this._update.bind(this), render: this._render.bind(this)
        });

        canvas.addEventListener('mousemove', event => this._players[0].move(event, canvas));
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

    _renderball() {
        // draw the ball
        this._ball.render(this._context);
    }

    _renderPlayers() {
        // draw each player
        this._players.forEach(player => player.render(this._context));
    }

    _renderScore() {
        // draw the score
        const align = this._canvas.width / 3;
        // real digit's width is DIGITS_CHAR_PIXELS*3
        // so add one DIGITS_CHAR_PIXELS to have a gap between sperate digits
        const digitWidth = DIGITS_CHAR_PIXELS * 4; 
        this._players.forEach((player, index) => {
            // make the number a string
            const score = "" + player.score;
            const digits = score.split('');

            const offset = align * (index + 1) -
                (digitWidth * digits.length / 2) + DIGITS_CHAR_PIXELS / 2;

            // draw the centers
            // this._context.fillStyle = 'yellow';
            // this._context.fillRect(align * (index + 1), 10, 1, 1);

            // draw each individual digit of the score
            digits.forEach((digit, pos) => {
                // convert again the char digit to a number (e.g. +digit)
                this._context.drawImage(DIGITS[+digit],
                    offset + pos * digitWidth,               // x position
                    20);                             // y position
            });
        });
    }

    _render() {
        // clear all - draw all black
        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        // render different components
        this._renderball();
        this._renderPlayers();
        this._renderScore();
    }

    start() {
        this._timer.start();
    }
}