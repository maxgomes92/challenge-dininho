
const ground = {
  x: 0,
  y: 0,
  img: null,
  speed: 10,
}

const sky = {
  x: 0,
  y: 0,
  img: null,
  speed: 2,
}

function preload () {
  ground.img = loadImage('assets/ground.png');
  sky.img = loadImage('assets/sky.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground.y = windowHeight - ground.img.height;
}

function draw() {
  background(255);

  drawBackground(sky);
  sky.x = updateBackgroundPosition(sky);

  drawBackground(ground);
  ground.x = updateBackgroundPosition(ground);

  animatePlayer();
}

function animatePlayer() {

}

function updateBackgroundPosition({x, img, speed}) {
  if (Math.abs(x) >= img.width) {
    return 0
  } else {
    return x - speed;
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
}
