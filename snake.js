class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        var newRect;
        if (this.rotateX === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            };
        } else if (this.rotateX === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            };
        } else if (this.rotateY === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            };
        } else if (this.rotateY === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            };
        }

        this.tail.shift();
        this.tail.push(newRect);
    }
}


class Apple {
    constructor() {
        var isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * (canvas.width / snake.size)) * snake.size;
            this.y = Math.floor(Math.random() * (canvas.height / snake.size)) * snake.size;
            for (var i = 0; i < snake.tail.length; i++) {
                if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
                    isTouching = true;
                    break;
                }
            }
            if (!isTouching) {
                break;
            }
        }
        this.color = "pink";
        this.size = snake.size;
    }
}

var canvas = document.getElementById("canvas");
var snake = new Snake(20, 20, 20);
var apple = new Apple();
var canvasContext = canvas.getContext("2d");
var gameOver = false;

window.onload = function () {
    setInterval(show, 1000 / 15);
};

function show() {
    if (!gameOver) {
        update();
        draw();
    }
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    checkCollision();
    eatApple();
}

function checkCollision() {
    var head = snake.tail[snake.tail.length - 1];
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {
        gameOver = true;
        endGame();
    }
}

function eatApple() {
    if (
        snake.tail[snake.tail.length - 1].x === apple.x &&
        snake.tail[snake.tail.length - 1].y === apple.y
    ) {
        snake.tail.push({ x: apple.x, y: apple.y });
        apple = new Apple();
    }
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black");
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(
            snake.tail[i].x + 2.5,
            snake.tail[i].y + 2.5,
            snake.size - 5,
            snake.size - 5,
            "white"
        );
    }

    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText(
        "Score: " + snake.tail.length,
        canvas.width - 120,
        18
    );
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function endGame() {
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "red";
    canvasContext.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && snake.rotateX !== 1) {
        snake.rotateX = -1;
        snake.rotateY = 0;
    } else if (event.keyCode === 38 && snake.rotateY !== 1) {
        snake.rotateX = 0;
        snake.rotateY = -1;
    } else if (event.keyCode === 39 && snake.rotateX !== -1) {
        snake.rotateX = 1;
        snake.rotateY = 0;
    } else if (event.keyCode === 40 && snake.rotateY !== -1) {
        snake.rotateX = 0;
        snake.rotateY = 1;
    }
});

