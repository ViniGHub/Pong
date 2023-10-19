var ctx = document.querySelector('canvas').getContext('2d');
let posySquare = (window.innerHeight / 2) - 50;

let posxBall = 50, posyBall = window.innerHeight / 2;
let acX = 10, acY = 0;

let score = 0;
const scoreVini = 51;

let lost = false;

document.querySelector('canvas').width = window.innerWidth;
document.querySelector('canvas').height = window.innerHeight;

$('#GameOBox').hide();

function drawCanv() {
    ctx.beginPath();
    ctx.strokeStyle = '#F45B69';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, window.innerHeight);
    ctx.moveTo(0, window.innerHeight / 2);
    ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#22181C';
    ctx.fillRect(window.innerWidth - 50, posySquare, 5, 100);

    ctx.beginPath();
    ctx.fillStyle = '#5A0001';
    ctx.arc(posxBall, posyBall, 15, 0, 2 * Math.PI, 0, 360);
    ctx.fill();
}

function moveBall() {
    if (((posyBall - 20 < posySquare + 100) && (posyBall + 20 > posySquare)) && (posxBall > window.innerWidth - 70 && posxBall < window.innerWidth - 50)) {
        score++;
        $('#score').html(score);

        acX = (Math.random() * -5) - 15;
        if (posySquare + 50 < posyBall) {
            acY = (((posyBall - (posySquare + 50)) * 0.5) > 15) ? 15 : (posyBall - (posySquare + 50)) * 0.5;

        } else if (posySquare + 50 > posyBall) {
            acY = (((posyBall - (posySquare + 50)) * 0.5) < -15) ? -15 : (posyBall - (posySquare + 50)) * 0.5;

        } else {
            acY = (Math.random() * 5) - 2.5;
        }

    } else if (posxBall < 30) {
        acX = (Math.random() * 5) + 15;
    } else if (posyBall < 15) {
        acY = Math.abs(acY);

    } else if (posyBall > window.innerHeight - 15) {
        acY = -Math.abs(acY);

    } else if (posxBall > window.innerWidth && !lost) {
        if (score > sessionStorage.getItem('highPlayer')) {
            sessionStorage.setItem('highPlayer', score);
        }

        $('#GameOBox').show();
        $('#GameO').html('Game Over');
        $('#GameOBox').append('<a id="Reini" onclick="location.reload()" href="#">Reiniciar</a>');

        $('#highVini').html(scoreVini);
        $('#highPlayer').html(sessionStorage.getItem('highPlayer'));

        setTimeout(() => {
            $('#GameOBox').css('box-shadow', '0 0 10px 7.5px rgba(34, 24, 28, 0.5)');
            $('#highs').css('box-shadow', '0 0 10px 7.5px rgba(34, 24, 28, 0.5)');
            $('#GameOBox').css('transform', 'scale(1.1)');
        }, 500);
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

$('body').on('mousemove', function (e) {
    posySquare = e.clientY - 50;

});

function gameFrame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    moveBall();
    drawCanv();

    requestAnimationFrame(gameFrame);
}


gameFrame();