var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backgroundImg;
var jungle;
var tiger, lion, snake, cheetah, jaguar, gorilla;
var tigerImg, lionImg, snakeImg, jaguarImg, gorillaImg, cheetahImg;
var animals, animalsGroup;
var jewels, diamondImg, rubyImg, goldImg, emeraldImg;
var jewelsGroup;
var score;
var edges;
var player, playerImg;
var gameOverImg, restartImg, gameOver, restart;
var playerFallen, playerFallenImg;
var dieSound, jumpSound;
var bird1, bird2, bird3, bird4, bird5, bird6, bird7, bird8, birdImg, bird;
var birdsGroup;

function preload(){

backgroundImg = loadImage("images/bg1.jpg");
 tigerImg = loadImage("images/tiger0.png")
 lionImg = loadImage("images/lion0.png")
 snakeImg = loadImage("images/snake0.png")
 jaguarImg = loadImage("images/jaguar0.png")
 gorillaImg = loadImage("images/gorilla0.png")
 cheetahImg = loadImage("images/cheetah0.png")

 diamondImg = loadImage("images/diamond0.png");
 rubyImg = loadImage("images/ruby0.png");
 goldImg = loadImage("images/gold0.png");
 emeraldImg = loadImage("images/emerald0.png");

 playerImg= loadAnimation("images/playerWalk1.png","images/playerWalk2.png","images/playerWalk3.png", "images/playerWalk4.png","images/playerWalk5.png","images/playerWalk6.png");
 playerJump=loadAnimation("images/playerJump1.png","images/playerJump2.png","images/playerJump3.png","images/playerJump4.png");
 playerFallenImg = loadImage("images/playerFallen.png");

gameOverImg = loadImage("images/gameOver2.png");
restartImg = loadImage("images/button.png");

dieSound = loadSound("images/gameOver.wav");
//jumpSound = loadSound("images/jump.wav");

birdImg = loadAnimation("bird cycle/bird1.png","bird cycle/bird2.png","bird cycle/bird3.png","bird cycle/bird4.png","bird cycle/bird5.png","bird cycle/bird6.png","bird cycle/bird7.png","bird cycle/bird8.png")
}

function setup() {
 createCanvas(1200,700);
 edges = createEdgeSprites();
  
 jungle=createSprite(600,350,1200,700);
  jungle.addImage(backgroundImg);
  jungle.scale= 2.5;
  jungle.x=jungle.width/2;

  player=createSprite(50,580,40,100);
  player.addAnimation("girlRunning" ,playerImg);
  player.scale=1.2
  
  animalsGroup = createGroup();
  jewelsGroup = createGroup();
  birdsGroup = createGroup();

  gameOver = createSprite(600,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(600,450);
  restart.addImage(restartImg);
  restart.scale = 0.7;

  score = 0;

}

function draw() {
 background("green");

 if(gameState === PLAY){
 gameOver.visible = false;
 restart.visible = false;

 jungle.velocityX=-(3+3*score/10);
  
 if(jungle.x <520){
        jungle.x = 600;
      }

      if(keyDown("space")&&player.y>=400){
        player.addAnimation("jumping",playerJump);
        player.changeAnimation("jumping",playerJump);
        player.scale=0.5 
        player.velocityY= -8;
      //  jumpSound.play();
}



player.velocityY= player.velocityY+0.8;

spawnJewels();
spawnAnimals();
birdFlying();

if(animalsGroup.isTouching(player)){
        gameState = END;
        dieSound.play();
}

 }
 else if(gameState === END){
 gameOver.visible = true;
 restart.visible = true;

 jungle.velocityX = 0;
 player.velocityY = 0;

 player.addAnimation("fallen", playerFallenImg);
 player.changeAnimation("fallen",playerFallenImg);
 player.scale = 0.8;
 player.setCollider("circle",0,0,40);
 player.y = 580;

 jewelsGroup.setVelocityXEach(0);
 animalsGroup.setVelocityXEach(0);
 birdsGroup.setVelocityXEach(0);

 jewelsGroup.setLifetimeEach(-1);
 animalsGroup.setLifetimeEach(-1);
 birdsGroup.setLifetimeEach(-1);

 birdsGroup.destroyEach();
 }

 player.collide(edges);

 if(mousePressedOver(restart)){
 resetGame();
 }

 drawSprites();

  fill ("lightGreen");
  stroke("white");
  textSize(30);
  text("FORTUNE COLLECTED : " + score,720,35);

if(jewelsGroup.isTouching(player)){
    score = score+1
    jewelsGroup.destroyEach();
}
}


function resetGame(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;

jewelsGroup.destroyEach();
animalsGroup.destroyEach();

player.changeAnimation("girlRunning", playerImg)
player.scale = 1.2;
player.y = 580;

score = 0;
}


function spawnAnimals(){
  if (frameCount % 350 === 0){
    var animals = createSprite(1115,600,10,40);
    animals.velocityX = -(6+score/10);

    animals.setCollider("circle",0,0,100);

     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: animals.addImage(tigerImg);
               break;
       case 2: animals.addImage(snakeImg);
               break;
       case 3: animals.addImage(jaguarImg);
               break;
       case 4: animals.addImage(gorillaImg);
               break;
       case 5: animals.addImage(cheetahImg);
               break;
       case 6: animals.addImage(lionImg);
               break;
       default: break;
     }
            
     animals.scale = 0.4;
     animals.lifetime = 300;
    
     animalsGroup.add(animals);

    // animals.depth = jewels.depth;  
    // animals.depth = animals.depth + 1;

  }

}

function spawnJewels(){
  if (frameCount % 170 === 0){
    var jewels = createSprite(1115,650,10,40);
    jewels.velocityX = -6;

     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: jewels.addImage(diamondImg);
               break;
       case 2: jewels.addImage(rubyImg);
               break;
       case 3: jewels.addImage(goldImg);
               break;
       case 4: jewels.addImage(emeraldImg);
               break;
       default: break;
     }     
     jewels.scale = 0.15;
     jewels.lifetime = 300;
    
     jewelsGroup.add(jewels);

  }
}

function birdFlying() {

        if (frameCount % 330 === 0) {
          bird = createSprite(100,200,50,70);
          bird.addAnimation("flying",birdImg);
          bird.scale = 0.6;
          bird.y = Math.round(random(250,300));
          bird.velocityX = 3;
          
          bird.lifetime = 300;
          
         birdsGroup.add(bird);
          }
        }