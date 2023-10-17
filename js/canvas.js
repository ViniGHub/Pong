var ctx = document.querySelector('canvas').getContext('2d');
let posySquare = (window.innerHeight / 2) -50;

let posxBall = 50, posyBall = window.innerHeight / 2;
let acX = 10, acY = 0;
let score = 0;
let lost = false;

document.querySelector('canvas').width = window.innerWidth;
document.querySelector('canvas').height = window.innerHeight;

function drawCanv() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(window.innerWidth - 50, posySquare, 5, 100);

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(posxBall, posyBall, 15, 0, 2 * Math.PI, 0, 360);
    ctx.fill();
}

function moveBall() {
    if (((posyBall - 20 < posySquare + 100) && (posyBall + 20 > posySquare)) && (posxBall > window.innerWidth - 70 && posxBall < window.innerWidth - 50)) {
        acX = Math.random() * -5 - 10;
        acY = Math.random() * 20 - 10;
        score++;
        $('#score').html(score);
    } else if (posxBall < 30) {
        acX = Math.random() * 5 + 10;
        acY = Math.random() * 20 - 10;
    } else if (posyBall < 0) {
        acY = Math.random() * 5;
    } else if (posyBall > window.innerHeight - 30) {
        acY = Math.random() * -5;
    } else if (posxBall > window.innerWidth && !lost) {
        $('#GameO').html('Game Over');
        $('main').append('<a onclick="location.reload()" href="#">Reiniciar</a>')

        lost = true;
    }


    posxBall += acX;
    posyBall += acY;

}

$('body').on('keydown', function (e) {
    if (e.key === 'ArrowDown') {
        if (!(posySquare > window.innerHeight - 100)) {
            posySquare += 10;
        }
    }
    if (e.key === 'ArrowUp') {
        if (!(posySquare < 0)) {
            posySquare -= 10;
        }
    }
    if (e.key === 'r') {
        location.reload();
    }
});

function gameFrame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    moveBall();
    drawCanv();

    requestAnimationFrame(gameFrame);
}


gameFrame();