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

// DRAW FUNCTION
function draw() {
    drawPaddle();

}

// UPDATE GAME FUNCTION
function update() {

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
