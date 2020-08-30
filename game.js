// SELECT CANVAS ELEMENTS
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS 
cvs.style.border = "3px solid #0ff";

// SET PADDLE THICKNESS
ctx.lineWidth = 3;

// SET GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; //PLAYER HAS 3 LIFES
let leftArrow = false;
let rightArrow = false;

// CREATE PADDLE
const paddle = {
    x: cvs.width / 2 - PADDLE_WIDTH / 2,
    y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 5
}

// DRAW PADDLE
function drawPaddle() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL PADDLE
document.addEventListener("keydown", function(event) {
    if(event.keyCode == 37) {
        leftArrow = true;
    } else if(event.keyCode == 39) {
        rightArrow = true;
    }
});

// MOVE PADDLE
function movePaddle() {
    if(leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    } else if(rightArrow && (paddle.x + paddle.width) < cvs.width) {
        paddle.x += paddle.dx; 
    }
}

document.addEventListener("keyup", function(event) {
    if(event.keyCode == 37) {
        leftArrow = false;
    } else if(event.keyCode == 39) {
        rightArrow = false;
    }
});

// CREATE BALL
const ball = {
    x : cvs.width/ 2, 
    y : paddle.y - BALL_RADIUS, 
    radius : BALL_RADIUS, 
    dx : 3 * (Math.random() * 2 - 1), 
    dy : -3
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = - ball.dx;
    }

    if(ball.y - ball.radius < 0) {
        ball.dy = - ball.dy; 
    }

    if(ball.y + ball.radius > cvs.height) {
        LIFE--;
        resetBall();
    }
}

// RESET BALL
function resetBall() {
    ball.x = cvs.width /2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1); 
    ball.dy = -3;
}

// DRAW BALL
function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();

    ctx.strokeStyle = "#2e3548";
    ctx.stroke()

    ctx.closePath();
} 

// MOVE BALL
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// DRAW FUNCTION
function draw() {
    drawPaddle();

    drawBall();
}

// UPDATE GAME FUNCTION
function update() {
    movePaddle();
    moveBall();
    ballWallCollision();
}


// GAME LOOP 
function loop() {
    // CLEAR CANVAS
    ctx.drawImage(BG_IMG, 0, 0);

    draw();
    update();

    requestAnimationFrame(loop);
}

loop();
