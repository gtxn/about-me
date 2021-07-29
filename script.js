window.alert("sorry if you're using mobile or if its not in full screen. This website is EXTREMELY unoptimised! if you can, use your laptop for full functionality ;DD")

let qnElem = document.getElementById('question')
let qnDiv = document.getElementById('Game')

let gSubmitElem = document.getElementById('gSubmit')
let anagramD = document.getElementById('anagram');
let ansElem = document.getElementById('gameUserInp')


let qna = [
    ["What's my name?", "GLENDA"],
    ["What school am I studying at?", "HWA CHONG"],
    ["What's my age?", "EIGHTEEN"],
    ["What sport have I been playing for over 10 years?", "TABLE TENNIS"]
]
let qArr, qn, ans


function checkAnswer(cAns) {
    let uAns = ansElem.value
    uAns = uAns.toUpperCase()
    console.log('check ans answers', uAns, cAns)

    ansElem.value = ''

    if (uAns == cAns) {
        console.log('CORRECT')
        return true
    } else {
        console.log('WRONG')
        return false

    }
}

function scrambleWord(word) {
    let a = word.split(""),
        n = a.length;

    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}


function renderTile(word) {
    let arrS = word.split('');
    arrS.forEach(x => {
        let tile = document.createElement('div');
        let letter = document.createElement('p')
        let text = document.createTextNode(x)
        letter.appendChild(text)
        tile.appendChild(letter)
        tile.setAttribute('class', 'tile')
        anagramD.append(tile)
    })
}

function win() {
    document.getElementById('Game').hidden = true
    document.getElementById('winIntroPage').hidden = false
    document.getElementById('fullProfile').hidden = false
    document.getElementById('hiddenLink').hidden = false
    document.getElementById('hiddenLink2').hidden = false
    document.getElementById('memoryLane').hidden = false
    document.getElementById('fullProfLink').hidden = false

    //confetti effect here !!
}

function giveup() {
    qnDiv.hidden = true
    document.getElementById('Game').hidden = true
    document.getElementById('giveUpIntroPage').hidden = false
    document.getElementById('fullProfile').hidden = false
    document.getElementById('hiddenLink').hidden = false
    document.getElementById('fullProfLink').hidden = false
    document.getElementById('hiddenLink2').hidden = false
    document.getElementById('memoryLane').hidden = false
}

function startGame() { //add confetti effect after winning
    document.getElementById('winIntroPage').hidden = true
    document.getElementById('giveUpIntroPage').hidden = true
    qna = [
        ["What's my name?", "GLENDA"],
        ["What school am I studying at?", "HWA CHONG"],
        ["What's my age?", "EIGHTEEN"],
        ["What sport have I been playing for over 10 years?", "TABLE TENNIS"]
    ]
    qArr = qna.pop()
    qn = qArr[0]
    ans = qArr[1]
    score = 0
    anagramD.innerHTML = ''
    qnDiv.hidden = false

    qnElem.innerText = qn

    console.log('corr', qn, ans)

    let scrambled = scrambleWord(ans)
    renderTile(scrambled)
}

function closeGame() {
    qnDiv.hidden = true
}

function submitHandler() {
    let cor = checkAnswer(ans)
    if (cor == true) {
        anagramD.setAttribute('style', 'background-color: green')
        setTimeout(() => {
            anagramD.setAttribute('style', 'background-color: aliceblue')
        }, 500)
        score = score + 1

        qArr = qna.pop()
        qn = qArr[0]
        ans = qArr[1]
        qnElem.innerText = qn
        anagramD.innerHTML = ''

        let scrambled = scrambleWord(ans)
        renderTile(scrambled)

        if (score == 3) {
            win()
            score = 0
        }
    } else {
        anagramD.setAttribute('style', 'background-color: lightcoral')
        setTimeout(() => {
            anagramD.setAttribute('style', 'background-color: aliceblue')
            window.alert('You lost😔 Press Start Game to try again')
            qnDiv.hidden = true
        }, 500)
    }
}

gSubmitElem.addEventListener('click', submitHandler)

ansElem.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        submitHandler()
    }
})


//canvas effect stuff
Object.getOwnPropertyNames(Math).map(function (p) {
    window[p] = Math[p]
});

var N_PARTICLES = 256,
    c = document.querySelector('#myCanvas') /* canvas elem */,
    w /* canvas width */, h /* canvas height */,
    ctx = c.getContext('2d') /* get canvas context */,
    confettis = [],
    particles = [],
    source = {} /* particle fountain source */,
    t = 0,
    req_id = null;


var Particle = function (i) {
    var confetti,
        pos,
        v,
        a,
        c_angle,
        angle_v
    delay = rand(N_PARTICLES, 0, 1);

    this.active = false;

    this.shoot = function (ctx) {
        var angle, angle_var, val,
            hue = rand(360, 0, 1);

        if (t - delay >= 0) {
            this.active = true;

            confetti = confettis[floor(random() * confettis.length)];

            pos = { 'x': source.x + rand(-10, 10), 'y': source.y };

            a = { 'x': 0, 'y': .4 };

            angle = rand(PI / 8, -PI / 8) - PI / 2;

            c_angle = 0;
            angle_v = rand(-30, 30);

            val = rand(h / 21, h / 60);
            v = {
                'x': val * cos(angle),
                'y': val * sin(angle)
            };
        }
    };


    this.motionUpdate = function () {
        v.x += a.x;
        v.y += a.y;
        pos.x += round(v.x);
        pos.y += round(v.y);
        c_angle += angle_v;

        if (pos.y > h | pos.x < 0 | pos.x > w) {
            pos = { 'x': source.x, 'y': source.y };
            this.active = false;
        }
    };

    this.draw = function (ctx) {
        ctx.save();

        ctx.translate(pos.x, pos.y);
        ctx.rotate(c_angle * Math.PI / 180);

        ctx.drawImage(confetti, -(confetti.width / 2), -(confetti.height / 2));

        ctx.restore();

        /* update its velocity and position */
        this.motionUpdate();
    };
}


var rand = function (max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
        min = min || 0,
        gen = min + (max - min) * random();

    return (_int) ? round(gen) : gen;
};


/* Load the CONFETTIIIII */
var loadConfetti = function () {
    confetti_orange = new Image;
    confetti_orange.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAgCAYAAAAmG5mqAAACR0lEQVQ4EYWUPWhUQRSFz6wGSSRG8AdUYhHsjIUiFqKiRcBCRbHyBwXBJprOJKIWK0iiIShIChHsxMYqFgoigpFY2StIEPFv1SimkIDx7eSb2fcm89y3mwezc+895+y97859Y9TgsWWtVqv2AHewZvRa4+ahEvM/317XZhkNsQ6CLeBVDZmLurw0FtgbOgHlHrFlcdzbhow8QWCHdRTy/YiYyGoC/x37tKq66TCf0l7TBrXoDV57KpiCcIoSXqV+2GoZWjQQyFZfNKvtpqzfgRUZJW8bHQ+xqs43IjuOofYuLdFUKqiYAa0L4gKjRCmtUbwS2YVmSf9ytXZxYKFzRYqSuaLPAO9TcAX5DhcRs1jtpa0eZAH2YXtByyM/Z9YEiW5xODMeMdqktbqTY0WOF5hL+knsXBQ/yUxdjfxgLgwXIWbpLl07G1CrPjOoseBj1ErKIrPqpbTHmYv4th3RseBj5DI4wL/wGj0F2ZkS52j9PsqedH6dwAU5i5W0dwJ0i/PJ+pX56mZkfuVL8ij/4gbP6gDrhw8ZxqWNj4qnMEOqc004BGPc+1Z/KW1jU4EjInqJaJcXVdVbWJIHsx+jJ5lJT3csLrD6FgRS++ICo62RoNJUYPu4PayORILJprOvTpUhr08F0/quRw0zMBK7IfanZClRvxnVn8K2Qt5GKc9pp7sm3Um/YAj3OrMuA3dUJwQ3Sxn5k+Z02pHdUyfgQjsDeZVH3Wgk6uEz/uD9QkGiZ2RwX99HhPuZ0rcZueHOtLax6rOjmAc/AI47EIfSbQAAAABJRU5ErkJggg==";
    confettis.push(confetti_orange);

    confetti_blue = new Image;
    confetti_blue.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAACUUlEQVRIDaVVTWsTQRh+ZjalJLZSxApaTwZ6UFQUBAU1SQkVxIOuGCPFrx/g3ZPk5A+oJw8qIgGpJpdKrQpNUkF7VURQ1IpCQYtIC8WYZGd8d5Odrt1uJtkOLO/X8z7PvMvuDIN35XIc+5PnIfkZMHkYkm0lu0L2AyQeo7p8H2OnfntbwvhMNRVmD4LjAcW7Vc7nyB+Q4grM1LSv1EWiKfqolITBJ8FYn7ZXSgsQp0n4iRYbAOCYmN6CiJFXglIuQcpx1K0DqFaHUJe7KL4MyO8OB2MGGH+IQmlnAKc2HUFP9CKhdrSQC2iIBDKpT2s65zEx9RSRvtdgiANsE7hxkzCX1uA6CjmkVaYpVgi9TILZdQSbRJmTi7DEVcUqkaWNDKq4C4fDHHmD6t9h/KkN41zyZdtepy6bGIYeGLFsW3xAMeLkL4wuBNT9aYE8feXHnAJjJ8je8oPaZ3j78jpVC89VlrHjyJWaG1dJvdO9aCYxT7TfWtT92Gvs08v8j+he1O6XeKVomDiq/A6dcKJARfEznlJ+h05I0dqMh38UtydjnljrhhM10x/plHrXYo9hcPM1rZIHEE7UIaCj0l0M11GY3e6GOhtetPHz7uq0bID+3TkUy0cCBYvPtsG+Omk1b5lApKZQKKfoonhBj7GKlF/p/p0j5jptyhaJU30P2X766it4OzOyMVFbqVgZI4E7tP9eO9QuUYuHf70uu5nI00yHaIp7NNmSm/ZZiUUI3MDZ9JeNT+plH5/qxVDUPpcHaPIo6P6DEJ9hNN7DTP9yof8Anxeh2egaMOMAAAAASUVORK5CYII=";
    confettis.push(confetti_blue);

    confetti_purple = new Image;
    confetti_purple.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAC6UlEQVQ4EaVVX0iTURQ/5+7q1EVCCoVJf8BpEgmG9He5zaA/0FtUEOYf+uNb9BoY9CKELxE9tqx9DSF66sGnYC7fCqMUpptLEorIQkGLpfPzO537zbsW6DbXfbj3nt/9nd93OPc756LRNObCalcfEnkBoBYQthJhEoF+EkIMLBpjLDL9feXV3ej+FHMKGmj4p24KFA8KYC8QwfNVpP6usHs6H1+QaUWIaCUfkc8rEeGGBIw/8ycGAkej23L5oDo0PNFdJEqrUstLXy1zed4lK8tTJVRdIkUTCDoCBOcRsS5biKP/BmBduzJcP5SN670trI1cq+GLezhlvYB4WvOIlVngVnu47qHG9FqwsHYIeuNnhUM8QsCdGgMLetsjdX0ZmzebFlbOKr/OMudLzrnHFiMgC+lSR9j9wrZ5KkpYOT/xDZdJrGVxPKVsTktyFahJ/zFCgcWM7oh/Kbm4cBGIYsqfI6xwANzXWkVHrAWCrYlmIXGUhewgLTBPdoT3hYuOWAt3jrjfcx4C2kaQ19X+vyNWIkbrVKOQYkLt+SO/l1Pm9k1FHGib2P34eKzGFsiaOkbqJ7l6x2wIodzhFM0FCXM/uRxq+zheBqUzTqfjk+GLtWTprm3xg8aEhe68wiFfvFOACLHTgbQjloKQzVoksyJxiacH57daamOjldBxmwtB38WsRTQEc8nBdfhVGmP+j5zCwUOTVUxqUA5cXHOm9WWP+n+1QNaqvq36uT3Ios85U9H5tnFeVZRiI0FlCmq2pF3/nQ1v4hwj7jV0NvlrMZJTmInEL8uo7YAoK1D0rzlnlqBnsl444GkGIBroedeykjMVNhlBda1Wtee+0B3yJySYcI+kVQIkznC93eETl80lmEmZ6bLWl2LjG038YgRY9OpG52mcFk2CY13D7qiyuW/kH3LmxFDD3h01fEEH12NzcbyxVuFC12v3uD4vKGJNNvwJL4v3INJhApSqsyFZg+2RBoM5fM9/xx/XTfXRTSL/+QAAAABJRU5ErkJggg==";
    confettis.push(confetti_purple);

    confetti_green = new Image;
    confetti_green.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAYAAACjkdXHAAACKElEQVQ4EY2UTWgTURDHZ1432bSNmHZjPXjxpHgQTzat0KNUquBBEET0ICpaKWqqIIrQkxchFVMQPRU8iUdFb1qtHzE3QT0IIkhPmqbxM7FJd5y3cZJNspvdd5nJf+Y3s7M7eQgBZ/3i6QEV7dujyP6z/GXpMRy8vyoIiuNlB16d394TwScAmHTiRIuFQnU3TGT/6t/KCxJNGXipAWoRccyyIhcacXG8LCH8bNdRweX4y1NDWu/aGYiyBGC3FsA+M9J7MhAuDs++R6B7rTA/PeARrXV9YTrBen1uGxo9H7TvPpXy6lAgrAErn/6MiJu13zy0v/vMzcyFplv3iGg0LPyxHQZUiVAwd6l0wERroWDu0va5nFLhYH6rWzo68wKF6oxIO9ph24Zc4KeKP5/aYPZGlzgxKgWIV69WKVuBnc1Y5Lgb/F/g3fexWytd4eSLY+s4+Yx0FEs2zGvfEMHLkpmY4z3e5I4RwXKx9O221nw7D+bTJxg86gbrvn0Dxu/+9oWtN+krCvFOJwifyK7dFL3lsZ1rx8BrfGPsk4SGJSrXCA6URrI/RHPg/tzZjTE0rvMQhzngOQpfCpOlVOatgNoa8GjKjCnjGSJsdQfE1zcJ2XSxmMrMiybWSCRVyg8EoF+8SYdWUpmHAritUoRVtyA+b1F+rUq7/ECdhzADypqYznH3nQ5IxHPR1cLw7AMp5Gfru/10Mj7YH9vLf7yvhZHMAifzqMHnH4mnn9rngQfNAAAAAElFTkSuQmCC";
    confettis.push(confetti_green);

    confetti_yellow = new Image;
    confetti_yellow.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAABsElEQVQ4Ea1UPUsDQRB9ezkNIn40FoKESLCylWBpLIyFlaQQCz9ACxs7+6Sws7ENKMRSRSxsbBQs/AMiEUVDLMQPVBAJGEPGl4uX3CW5GC9ZmNudNzNvdmb3VuGfQ67QhXYMQocfwlm4UniiPJPqAT5cKhC1DOp/D0mhlyTTlFlKiBGaY5TgkbZDygHucKpCyNVNIjfohhfr3Ncyyb2OxE4GQRLfCHsc7SnMsBFHJB+n6E5+dXGFPtacrQpmMxXSiPO7VJegUaPCh61dEmXeRWwzwbwjhyBL2xlbeEG/JMXDdQ+xAGWKen8pVngqGQTtSdJI0Gmu5GRdFA90kym21BBerCZzbXQhhSC3OkYsQ98EfcuVSBoRJtgzA2yzYBefWFHDeLPhDSpGJXLLcnWj9HKpJkEea8qPDVN1MxcPvo3XFJZemkyCmGoyQYFKyTk6MGD0uNPk/p2PlQ+TFZgrVef+w4y0JyjcoBxWXTHWCNJ4EyI18B0VwHUN3BWk8UZNVEXmsV+FNQEUHrovW7zgHa84sWFNKhryiFVwxNUIn7VWDz7lo/wZo3KPBeNpaXGCHxCXZrRLqKcwAAAAAElFTkSuQmCC";
    confettis.push(confetti_yellow);

    confetti_purple_circle = new Image;
    confetti_purple_circle.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABPElEQVQYGT2QsUvDQBTG37tkCsZ/wKUUUwUNgrqpkAxuOkvBBhxcXQSdBAddFAcHByfRVHASHB3aFHERFEEo0qYS1MlBB0VpSr3nu7bnW97d/b773neH0KvDiVvL6uufAoEuAD03f9Lr5Rv3TXNUixOvNi2EOAbArAYE9E0S1oOKc6DO8Mh7zJhoPiCizfAeCCJEyDGaUwIpf/NBZehMsGirJyo+lU8nC5Gzulh25qWUSx0nYewrQyz6jQQQMrLdzgZXw4mCukI/jtlkkCM4gpBsBahJn1rw3xG+1FpKsgVnulMbwzILqusK/doYEricO03eW1UTQe4AGbM8fjf06gMAooQCHCLa4GQmz9rbrI60ut/j19cE4HYXaE/uRBcfr7Cw0nDSjlChcCYeB4PyLB7lR74QyMsgyp3ra3/bPHFQcIeq6AAAAABJRU5ErkJggg==";
    confettis.push(confetti_purple_circle);

    confetti_orange_circle = new Image;
    confetti_orange_circle.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABcElEQVQoFW1SMUvDUBC+e0kVCurQX2DTxakgiEsX/4Crg4OD4FTpVCJFwUVjioO4d3EXxD+gi7i4uzSDUJcOUgfRJnnvvHtpII2+Je/e9313990FoXDioL6hHNVFohYA1hgaE8KjpuR80X97zakol5cDqDTr3qlS4DPZycHCdwpEJ44fXfIbKQEyAfZYYAzRmdbJ+gdNljXpTY6vmbcAiH194bWFj9KS4+CzFaS0VelFTwIUTxo2thHpDgi+EwNNJR6kJc7Y/08gYtcf3hPBgKtVXQUdlZnmBkx6W8xevpMBiyNiiz3ZKcGn+hqWicVYA8xwqskgxgKuwNJakVS+u2hyfKxkD0JAULtl4lyMGW4AHpRO44DBKZdsy5TmiLMgDVf32csOO58k8fTKLleHXlf2wI98YCCmxYNtiStkAhkW7blH0Y0VcUJk4SF/Axnr32o04UQdEQiWiyzvJ/AasgcZK+e1/554kJaqx6P3PNkvOOqVQmPX4E4AAAAASUVORK5CYII=";
    confettis.push(confetti_orange_circle);

    confetti_blue_bar = new Image;
    confetti_blue_bar.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAGCAYAAADKfB7nAAAANklEQVQYGWNkWHcolYGRUYqBHPDv/ywWoOZ0oF5jcvQzMDFuYSJLI5KmgTeAheH//5kUBOIzAHcGC4ESYxi3AAAAAElFTkSuQmCC"
    confettis.push(confetti_blue_bar);

    confetti_star = new Image;
    confetti_star.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABH0lEQVQoFX2SvUoDQRDHf3sQkYiCAVs1kEBExVewCwSxyXPEx7KzEbGx8QUs7IQzMQY7QQtRBMFxZmPC7uY2A3ez/6+7ueFgScmInSVyXpKSDXlmZD3nKnICNc5wNH3PmFwVLw+sU2esWkOvN77YdR0+Um/1m+sM/oPmb+iDDC+UkyGHOtopQlvVto5qfWvBCa/qKZUv1VPyw6WTe9bY5ErJ44pAjrrlnZPCHfHJCz196k3OGfHmU7/l5guTJ1YpuNCRepE5BMI1v/Rdk2+j52ED8kiLFf9dBquq5bYZzoR42zU6M6GyC3shH4dhPxT1PElwpKfhA28W7rR3dUT7t7u6TMNWU316ju8y4VzG9CXdhWLPqx4nApSGAskfU/0P1ShHb5/Nhf8AAAAASUVORK5CYII="
    confettis.push(confetti_star);
};


var initCanvas = function () {
    var s = getComputedStyle(c);

    if (req_id) {
        particles = [];
        cancelAnimationFrame(req_id);
        req_id = null;
        t = 0;
    }


    w = c.width = ~~s.width.split('px')[0];
    h = c.height = ~~s.height.split('px')[0];
    source = { 'x': round(w / 2), y: h };

    /* create particles and add them to the particle array */
    for (var i = 0; i < N_PARTICLES; i++) {
        particles.push(new Particle(i));
    }

    drawOnCanvas();
};

var drawOnCanvas = function () {
    ctx.clearRect(0, 0, w, h);


    /* go through each particle in the particle array */
    for (var i = 0; i < N_PARTICLES; i++) {
        if (particles[i].active) {
            particles[i].draw(ctx);
        }
        else {
            particles[i].shoot(ctx);
        }
    }

    t++;

    req_id = requestAnimationFrame(drawOnCanvas);

};


loadConfetti();


setTimeout(function () {
    initCanvas();

    addEventListener('resize', initCanvas, false);

    c.addEventListener('mousemove', function (e) {
        ctx.clearRect(0, 0, w, h);

        source.x = e.clientX;
        source.y = e.clientY;
    }, false);
}, 15);

