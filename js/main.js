
let gameSpeed = 100
let totalTime = 0

const SPACE_BAR = 32

const ground = {
  x: 0,
  y: 0,
  img: null,
  speed: gameSpeed * 4,
}

const sky = {
  x: 0,
  y: 0,
  img: null,
  speed: gameSpeed,
}

const player = {
  x: null,
  y: null,
  speed: gameSpeed * 4,
  runningImgs: [],
  risingImg: null,
  fallingImg: null,

  // jump related
  isRising: false,
  isFalling: false,
  jumpingTime: 0,
  startingY: 0,
}

function preload () {
  ground.img = loadImage('assets/ground.png');
  sky.img = loadImage('assets/sky.png');

  player.runningImgs = [
    loadImage('assets/player/running/running_1.png'),
    loadImage('assets/player/running/running_2.png'),
    loadImage('assets/player/running/running_3.png'),
    loadImage('assets/player/running/running_4.png'),
  ]

  player.risingImg = loadImage('assets/player/jumping/rising.png')
  player.fallingImg = loadImage('assets/player/jumping/falling.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupPositioning()
}

function draw() {
  background(255);

  // Updates total time
  totalTime += deltaTime / 1000

  drawBackground(sky);
  sky.x = updateBackgroundPosition(sky);

  drawBackground(ground);
  ground.x = updateBackgroundPosition(ground);

  animatePlayer(player);
}

function keyPressed() {
  switch (keyCode) {
    case SPACE_BAR:
      handleJump()
      break;
    default:
  }
}

function handleJump() {
  if (player.isFalling || player.isRising) return;

  player.isRising = true;
  player.jumpingTime = 0;
  player.startingY = player.y;
}

function setupPositioning() {
  ground.y = windowHeight - ground.img.height;
  player.x = windowWidth * 0.2;
  player.y = windowHeight - 240;
}

function animatePlayer() {
  const {
    x, y,
    runningImgs,
    speed,
    isRising,
    isFalling,
    jumpingTime,
  } = player

  if (isRising || isFalling) {
    // (-50x^2)+30x
    const currentY = player.y
    const height = -50*Math.pow(jumpingTime,2) + 30*jumpingTime;
    const newY = player.startingY - height * 50;

    // Detect if falling
    if (newY > currentY) {
      player.isRising = false;
      player.isFalling = true;
    }

    // Detect end of jump
    if (newY > player.startingY) {
      player.isFalling = false;
      player.y = player.startingY;
      image(runningImgs[0], x, player.y);
    } else {
      player.y = newY;

      const img = isRising ? player.risingImg : player.fallingImg
      image(img, x, player.y);
    }

    player.jumpingTime += deltaTime / 1000
  } else {
    const step = 80 / speed
    const imgIndex = Math.round((totalTime / step) % 3) // Returns 0 to 3
    image(runningImgs[imgIndex], x, y)
  }
}

function updateBackgroundPosition({x, img, speed}) {
  if (Math.abs(x) >= img.width) {
    return img.width + x
  } else {
    return (x - (speed * (deltaTime / 1000)));
  }
}

function drawBackground ({img, x, y}) {
  image(img, x, y);
  
  let endOfGround = x + img.width;
  while (endOfGround <= windowWidth) {
    image(img, endOfGround, y);
    endOfGround += img.width;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupPositioning();
}
