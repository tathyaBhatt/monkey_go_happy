var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOverImg, gameOver;
var bananaGroup, obstacleGroup;
var obstacle, obstacleImg;
var black, blackImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
obstacleImg = loadImage("stone.png");
blackImg = loadImage("Black_Box.png");
gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    if(player.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
     }
  
  }
   
   if(player.isTouching(obstacleGroup)){
     gameState = END;
  }
  if(gameState === END){
    backgr.velocityX=0;
    banana.velocityX = 0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    obstacle.velocityX = 0;
    backgr.addImage(blackImg);
    gameOver = createSprite(displayWidth/5, displayHeight/5);
    gameOver.addImage(gameOverImg);
    obstacle.visible = false;
    banana.visible = false;
    player.visible = false;
  }
   spawnBananas();
   spawnObstacles();
  drawSprites();
}
function spawnBananas(){
  if(frameCount % 100 === 0){
    banana = createSprite(1000, random(100, 150), 40, 10);
    bananaGroup.add(banana);
    banana.addImage(bananaImg);
    banana.velocityX = -5;
    banana.scale = 0.05
  }
}
function spawnObstacles(){
  if(frameCount % 300 === 0){
   obstacle = createSprite(1000, 320, 20, 20);
   obstacleGroup.add(obstacle);
   obstacle.addImage(obstacleImg);
   obstacle.debug = false;
   obstacle.setCollider("circle", 0,0, 170)
   obstacle.velocityX = -5;
  var i = Math.round(random(1, 3));
  switch(i){
    case 1:
      obstacle.scale = 0.5;
      break;
    case 2:
      obstacle.scale = 0.7;
      break;
    case 3:
      obstacle.scale = 0.9;
      break;
    default:
      break;
  }
  }
}