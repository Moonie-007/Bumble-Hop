//board
let board;
let  boardWidth = 360;
let boardHeight = 576;
let context;

//bumble
let bumbleWidth = 46;
let bumbleHeight = 46;
let bumbleX = boardWidth/2 - bumbleWidth/2;
let bumbleY = boardHeight*7/8 - bumbleHeight;
let bumbleRightImg;
let bumbleLeftImg;

let velocityX = 0;

//platforms
let platformArray =[];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;


let bumble = {
    img: null,
    x: bumbleX,
    y : bumbleY,
    height : bumbleHeight
} 


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw
    //context.fillStyle = "green";
    //context.fillRect(bumble.x, bumble.y, bumble.width, bumble.height);

    //load imgs
    bumbleRightImg = new Image();
    bumbleRightImg.src = "./bumble-right.png";
    bumble.img = bumbleRightImg;
    bumbleRightImg.onload = function(){
        context.drawImage(bumble.img, bumble.x, bumble.y, bumble.width, bumble.height);
    }
    bumbleLeftImg = new Image();
    bumbleLeftImg.src = "./bumble-left.png";

    platformImg = new Image();
    platformImg.src = "./platform.png"

    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBumble);

}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0, board.width, board.height)

    bumble.x += velocityX;
    if(bumble.x > bumbleWidth) {
        bumble.x = 0;
    }
    else if(bumble.x + bumble.width < 0) {
        bumble.x = boardWidth;
    }
    context.drawImage(bumble.img, bumble.x, bumble.y, bumble.width, bumble.height);
    //platforms
    for (let i = 0; i< platformArray.length; i++) {
        let platform = platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    




}

function moveBumble(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        velocityX = 4;
        bumble.img = bumbleRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = -4;
        bumble.img = bumbleLeftImg;
    }
}

//starting platforms
function placePlatforms() {
    platformArray = [];

    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        width : platformWidth,
        height: platformHeight,
    }

    platformArray.push(platform);

    platform = {
        img : platformImg,
        x: boardWidth/2,
        y : boardHeight - 150,
        width : platformWidth,
        height: platformHeight,
    }

    platformArray.push(platform);


}
