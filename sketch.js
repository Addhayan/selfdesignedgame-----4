var PLAY = 0;
var PLAY1 = 1;
var PLAY2 = 2;

var END = 1;
var gameState = PLAY;

var hero;
var heroPunching;
var obstacles , obstacle1Img , obstacle2Img , obstacle3Img , obstacle4Img
var powerups , healPowerup , speedPowerup;
var bg;
var heart , sixHearts , fiveHearts , fourHearts , threeHearts , twoHearts , oneHeart , zeroHeart;
var gameOver , gameOverimg ;
var dieSound;
var punchingSound;
var ground;
var heart;
var life;

function preload(){
  heroFlying = loadImage("images/hero_flying.png");
  heroPunching = loadImage("images/hero_punching.png");
  obstacle1Img = loadImage("images/obstacle_1.png");
  obstacle2Img = loadImage("images/obstacle_2.png");
  obstacle3Img = loadImage("images/obstacle_3.png");
  obstacle4Img = loadImage("images/obstacle_4.png");
  healPowerup = loadImage("images/heal_powerup.png");
  speedPowerup = loadImage("images/speedIncrease_powerup.png");
  bg = loadImage("images/city.png");
  sixHearts = loadImage("images/6_hearts.png");
  fiveHearts = loadImage("images/5_hearts.png");
  fourHearts = loadImage("images/4_hearts.png");
  threeHearts = loadImage("images/3_hearts.png");
  twoHearts = loadImage("images/2_hearts.png");
  oneHeart = loadImage("images/1_heart.png");
  zeroHeart = loadImage("images/0_hearts.png");
  gameOverimg = loadImage("images/gameOver.png");
  dieSound = loadSound("sounds/herodie_sound.mp3");
  punchingSound = loadSound("sounds/punching_sound.wav");
}

function setup() {
  createCanvas(1500,700);

  ground = createSprite(1500,500,800,500);
  ground.addImage("ground",bg);
  ground.x = ground.width/2;
  ground.velocityX = -4;

 hero = createSprite(500,500,50,50);
 hero.addImage("flying",heroFlying);
 hero.addImage("punching",heroPunching);


 heart = createSprite(150,40,30,30);
 heart.scale = 0.8;

 heart.addAnimation("6hearts",sixHearts);
 heart.addAnimation("5hearts",fiveHearts);
 heart.addAnimation("4hearts",fourHearts);
 heart.addAnimation("3hearts",threeHearts);
 heart.addAnimation("2hearts",twoHearts);
 heart.addAnimation("1hearts",oneHeart);
 heart.addAnimation("0hearts",zeroHeart);
//  heart.changeAnimation("6Hearts");

gameOver = createSprite(750,350);
gameOver.addImage(gameOverimg);

 obstaclesGroup = createGroup();
 powerupsGroup = createGroup();
 
 
  
}

function draw() {
  background("black");

  if(gameState === PLAY){
    gameOver.visible = false;
 if(ground.x < 0){
    ground.x = ground.width/2;
  } 

  hero.y =  World.mouseY;
  hero.x = World.mouseX;

 Obstacles();
 Powerups();
 

//  if(hero.isTouching(obstaclesGroup)){
//    heart.visible = false;
//    heart.changeAnimation("0hearts");
//  }



 if(keyCode === 32){
   hero.changeAnimation("punching");
   hero.scale = 0.5;
 }

 if(keyCode === 85){
   hero.changeAnimation("flying");
   hero.scale = 1;
 }

 if(hero.isTouching(obstaclesGroup)){
   if(sixHearts){
    heart.changeAnimation("5hearts",fiveHearts);
   }
   if(fiveHearts) {
    heart.changeAnimation("4hearts",fourHearts);
   }
   if(fourHearts){
    heart.changeAnimation("3hearts",threeHearts);
   }
   if(threeHearts){
    heart.changeAnimation("2hearts",twoHearts);
   }
   if(twoHearts){
    heart.changeAnimation("1hearts",oneHeart);
   }
   if(oneHeart){
    heart.changeAnimation("0hearts",zeroHeart);
    gameState = END;
   }
 }
}

 if(gameState === END){
  gameOver.visible = true;
   hero.velocityX = 0;
   obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
  
 }




  drawSprites();

}

 /* function Heart(){
  heart = createSprite(200,200,50,50);
  heart.addImage("heart",heartImg);
} */

function Obstacles(){
  if(frameCount % 100 === 0){
    obstacles = createSprite(1000,500,50,50);
    obstacles.y = Math.round(random(150,550));
    //generating random obstacles
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 :  obstacles.addImage("1",obstacle1Img);
                break;
      case 2 :  obstacles.addImage("2",obstacle2Img);
                break;
      case 3 :  obstacles.addImage("3",obstacle3Img);
                break;
      case 4 : obstacles.addImage("4",obstacle4Img);
               break;
      default : break;
      
    }

  obstaclesGroup.add(obstacles);
  Obstacles.lifetime = 250;

  obstacles.velocityX = -6;
    obstacles.scale = 0.3;
  }
}

function Powerups(){
  if(frameCount % 150 === 0){
    powerups = createSprite(950,500,50,50);
    powerups.y = Math.round(random(150,550));
    //generating random powerups
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : powerups.addImage("1",healPowerup);
               break;
      case 2 : powerups.addImage("2",speedPowerup);
               break;
      default : break;

    }

    powerupsGroup.add(powerups);
    powerups.lifetime = 190;

    powerups.velocityX = -5;
    powerups.scale = 0.3;


  }
}

