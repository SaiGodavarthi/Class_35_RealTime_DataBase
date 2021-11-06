var hypnoticBall, database;
var position;
var ball_img

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  //hypnoticBall.shapeColor = "red";
  hypnoticBall.addImage(ball_img);
  hypnoticBall.scale = 0.5


  var hypnoticBallPosition = database.ref('Ball');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function preload(){
  ball_img = loadImage("pikaFace.png")
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref("Ball").set({
x:hypnoticBall.x+x,
y:hypnoticBall.y+y
  })
  
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
