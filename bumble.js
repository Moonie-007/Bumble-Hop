// board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// bumble
let bumbleWidth = 46;
let bumbleHeight = 46;
let bumbleX = boardWidth / 2 - bumbleWidth / 2;
let bumbleY = (boardHeight * 7) / 8 - bumbleHeight;
let bumbleRightImg;
let bumbleLeftImg;

let bumble = {
    img: null,
    x: bumbleX,
    y: bumbleY,
    width: bumbleWidth,
    height: bumbleHeight
};

let velocityX = 0;
let velocityY = 0;
let initialVelocityY = -8;
let gravity = 0.4;

// score
let score = 0;
let highestBumbleY = bumbleY;

// platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
    // load images
    bumbleRightImg = new Image();
    bumbleRightImg.src = "./bumble-right.png";
    bumble.img = bumbleRightImg;

    bumbleLeftImg = new Image();
    bumbleLeftImg.src = "./bumble-left.png";

    platformImg = new Image();
    platformImg.src = "./platform.png";

    velocityY = initialVelocityY;

    placePlatforms();
    requestAnimationFrame(update);

    document.addEventListener("keydown", moveBumble);
    document.addEventListener("keyup", stopBumble);
};

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    //gravity
    velocityY += gravity;
    bumble.x += velocityX;
    bumble.y += velocityY;

    if (bumble.x > boardWidth) {
        bumble.x = -bumble.width;
    } else if (bumble.x + bumble.width < 0) {
        bumble.x = boardWidth;
    }
    if (velocityY < 0 && bumble.y < boardHeight * 3 / 4) {
        for (let platform of platformArray) {
            platform.y -= velocityY;
        }
    }
    if (bumble.y < highestBumbleY) {
        score += Math.floor(highestBumbleY - bumble.y);
        highestBumbleY = bumble.y;
    }

    // bumble
    if (bumble.img && bumble.img.complete) {
        context.drawImage(
            bumble.img,
            bumble.x,
            bumble.y,
            bumble.width,
            bumble.height
        );
    }
    for (let platform of platformArray) {
        if (
            velocityY >= 0 &&
            bumble.x + bumble.width > platform.x &&
            bumble.x < platform.x + platform.width &&
            bumble.y + bumble.height >= platform.y &&
            bumble.y + bumble.height - velocityY <= platform.y + 5
        ) {
            velocityY = initialVelocityY;
        }
        if (platform.img && platform.img.complete) {
            context.drawImage(
                platform.img,
                platform.x,
                platform.y,
                platform.width,
                platform.height
            );
        }
    }
    while (
        platformArray.length > 0 &&
        platformArray[0].y >= boardHeight
    ) {
        platformArray.shift();
        newPlatform();
    }
    if (bumble.y > boardHeight) {
        bumble.x = bumbleX;
        bumble.y = bumbleY;
        velocityX = 0;
        velocityY = initialVelocityY;

        score = 0;
        highestBumbleY = bumbleY;

        placePlatforms();
    }

    context.save();
    context.fillStyle = "#000000";
    context.font = "12px 'Press Start 2P', monospace";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("SCORE", 10, 10);
    context.fillText(String(score), 10, 30);
    context.restore();
}

function moveBumble(e) {
    if (
        e.code === "ArrowRight" || e.code === "KeyD"
    ) {
        velocityX = 4; bumble.img = bumbleRightImg;
    } else if (
        e.code === "ArrowLeft" || e.code === "KeyA"
    ) {
        velocityX = -4; bumble.img = bumbleLeftImg;
    }
}

function stopBumble(e) {
    if (
        (e.code === "ArrowRight" || e.code === "KeyD") && velocityX > 0) {
        velocityX = 0;} 
    else if ( (e.code === "ArrowLeft" || e.code === "KeyA") &&velocityX < 0) {
        velocityX = 0;
    }
}

//starting platform
function placePlatforms() {
    platformArray = [];

    platformArray.push({
        img: platformImg,
        x: boardWidth / 2 - platformWidth / 2,
        y: boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    });

    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(
            Math.random() * (boardWidth - platformWidth)
        );

        platformArray.push({
            img: platformImg,
            x: randomX,
            y: boardHeight - 150 - 75 * i,
            width: platformWidth,
            height: platformHeight
        });
    }
}

function newPlatform() {
    let randomX = Math.floor(
        Math.random() * (boardWidth - platformWidth)
    );

    platformArray.push({
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    });
}
