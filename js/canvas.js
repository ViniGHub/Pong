var ctx = document.querySelector('canvas').getContext('2d');
let posySquare = (window.innerHeight / 2) - 50;

let posxBall = 50, posyBall = window.innerHeight / 2;
let acX = 5, acY = 0;

let colorLine = '#F45B69', colorRect = '#000000', colorBall = '#5A0001';

let score = 0;
const scoreVini = 51;

let lost = false;
let ArrowDownPress = false;
let ArrowUpPress = false;

document.querySelector('canvas').width = window.innerWidth;
document.querySelector('canvas').height = window.innerHeight;

$('#GameOBox').hide();

if (sessionStorage.getItem('beatVini') != null) {
    $('canvas').css('background', 'black');
    $('#score').css('color', 'white');

    colorLine = '#fff';
    colorRect = '#ff0000';
    colorBall = '#ff0000';
}

function drawCanv() {
    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, window.innerHeight);
    ctx.moveTo(0, window.innerHeight / 2);
    ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = colorRect;
    ctx.fillRect(window.innerWidth - 50, posySquare, 5, 100);

    ctx.beginPath();
    ctx.fillStyle = colorBall;
    ctx.arc(posxBall, posyBall, 15, 0, 2 * Math.PI, 0, 360);
    ctx.fill();
}

function moveBall() {
    if (((posyBall - 20 < posySquare + 100) && (posyBall + 20 > posySquare)) && (posxBall > window.innerWidth - 70 && posxBall < window.innerWidth - 50)) {
        score++;
        $('#score').html(score);

        acX = (Math.random() * -2.5) - 5;
        if (posySquare + 50 < posyBall) {
            acY = (((posyBall - (posySquare + 50)) * 0.25) > 5) ? 5 : (posyBall - (posySquare + 50)) * 0.25;

        } else if (posySquare + 50 > posyBall) {
            acY = (((posyBall - (posySquare + 50)) * 0.25) < -5) ? -5 : (posyBall - (posySquare + 50)) * 0.25;

        } else {
            acY = (Math.random() * 2.5) - 2.5;
        }

    } else if (posxBall < 30) {
        acX = (Math.random() * 2.5) + 5;
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

        if (sessionStorage.getItem('highPlayer') > scoreVini) {
            sessionStorage.setItem('beatVini', true);
        }

        lost = true;
    }


    posxBall += acX;
    posyBall += acY;

}

function moveRect() {
    if (!(posySquare > window.innerHeight - 100) && ArrowDownPress) {
        posySquare += 10;
    }

    if (!(posySquare < 0) && ArrowUpPress) {
        posySquare -= 10;
    }

}

$('body').on('keydown', function (e) {
    if (e.key === 'ArrowDown' && !ArrowDownPress) {
        ArrowDownPress = true;
        ArrowUpPress = false;
    }
    if (e.key === 'ArrowUp' && !ArrowUpPress) {
        ArrowUpPress = true;
        ArrowDownPress = false;
    }
    if (e.key === 'r') {
        location.reload();
    }
});

$('body').on('keyup', function (e) {
    if (e.key === 'ArrowDown') {
        ArrowDownPress = false;
    }
    if (e.key === 'ArrowUp') {
        ArrowUpPress = false;
    }
});

$('body').on('mousemove', function (e) {
    if ((e.clientY < window.innerHeight - 50) && (e.clientY > 50)) {
        posySquare = e.clientY - 50;
    } else {
        if (e.clientY < 50) {
            posySquare = 0;
        }
        if (e.clientY > window.innerHeight - 50) {
            posySquare = window.innerHeight - 100;
        }
    }

});

function gameFrame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    moveBall();
    moveRect();
    drawCanv();

    setTimeout(() => {
        gameFrame();
    }, 1);
    // requestAnimationFrame(gameFrame);
}


gameFrame();