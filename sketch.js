var ball;
let database;
let position;

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  ball = createSprite(250, 250, 10, 10);
  ball.shapeColor = 'red';
  //   position is under ball;
  var hypotheticalBallPosition = database.ref('ball/position');
  hypotheticalBallPosition.on('value', readPosition, showError);
}

function draw() {
  background('white');
  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  } else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  } else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  } else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();
}

// function changePosition(x, y) {
//   ball.x = ball.x + x;
//   ball.y = ball.y + y;
// }

function readPosition() {
  position = data.val();
  hypotheticalBallPosition.x = position.x;
  hypotheticalBallPosition.y = position.y;
}

function writePosition(x, y) {
  database.ref('ball/position').set({
    x: position.x + x,
    y: position.y + y,
  });
}

function showError() {
  console.error('Error in writing to the database ');
}
