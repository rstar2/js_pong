import Timer from './Timer.js';
import Ball from './Ball.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const ball = new Ball(10, 10);
ball.vel.x = ball.vel.y = 10;

const timer = new Timer({
    update, render: render.bind(this, context)
});
timer.start();

function update(dt) {
    ball.update(dt);

    //TODO: check for collisions
}

function render(context) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    ball.render(context);
}