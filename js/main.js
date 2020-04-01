
let gameSpeed = 100
let totalTime = 0

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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupPositioning()
}

function draw() {
  background(255);

  drawBackground(sky);
  sky.x = updateBackgroundPosition(sky);

  drawBackground(ground);
  ground.x = updateBackgroundPosition(ground);

  animatePlayer(player);
}

function setupPositioning() {
  ground.y = windowHeight - ground.img.height;
  player.x = windowWidth * 0.2;
  player.y = windowHeight - 240;
}

function animatePlayer({x, y, runningImgs, speed}) {
  totalTime += deltaTime / 1000

  const step = 80 / speed
  const imgIndex = Math.round((totalTime / step) % 3) // Returns 0 to 3
  image(runningImgs[imgIndex], x, y)
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
