var r = 255;
var g = 0;

var prog = 15;

var test = false;
var time = 0;

var button;
var begin = false;

function setup() {
  createCanvas(1440,2960);
  background(255);
  textSize(100);
  button = createButton('start');
  button.position(width/2, height/2);
  button.size(500,200);
  button.mousePressed(start);

  frameRate(60);
}

function draw() {
  if(begin) {
    background(255);
    life(r,g);
    battery();

    if(prog < 500) {
      if(prog < 150) {
        low();
      }
      prog+=3;
      var progR = map(prog,15,500,255,0);
      r = progR;
      var progG = map(prog,15,500,0, 255);
      g = progG;
      time = int(millis()/1000);
    } else {
      charged();
    }
  }

  if(test) {
    timer(time);
    screenLimit();
  }
}

function start() {
  begin = true;
  button.hide();
}
//draws battery outline
function battery() {
  noFill();
  strokeWeight(15);
  stroke(0);
  rectMode(CENTER);
  rect(width/2,height/2,500,200);
  rect((width/2)+275,height/2,50,100);
}

//draws charge progress
function life(re,gr) {
  fill(re,gr,0);
  noStroke();
  rectMode(CORNER);
  rect((width/2)-250,(height/2)-100,prog,200);
}

//displays text when low battery
function low() {
  textAlign(CENTER);
  fill(150,0,0);
  strokeWeight(5);
  stroke(150,0,0);
  text("LOW\nBATTERY",width/2,1150);
}

//displays text when charged
function charged() {
  textAlign(CENTER);
  fill(0,150,0);
  strokeWeight(5);
  stroke(0,150,0);
  text("100%\nCHARGED",width/2,1150);
}

//displats timer for test
function timer(t) {
  fill(0);
  strokeWeight(2);
  stroke(0);
  textAlign(LEFT);
  text(t + " seconds",100,100);
}

//displats edge of screen for test
function screenLimit() {
  noFill();
  strokeWeight(5);
  stroke(0);
  rectMode(CENTER);
  rect(width/2,height/2,width,height);
}
