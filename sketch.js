var balloon, balloon2, balloon3;
var balloonImg, balloon2Img, balloon3Img;
var bgi, bgiImg;
var bird, birdImg;
var lPost, lPostImg;
var obstacleGroup;
var obstaclesBottomGroup;
var ObstaclesBottom;

var gameState = "play"
var score = 0;

function preload(){
bgiImg = loadImage("pics/bgimg.png");
balloonImg = loadImage("pics/hotairballoon1.png");
birdImg= loadImage("pics/birds.png");
lPostImg = loadImage("pics/lamp-posts.png");

}

function setup(){
createCanvas(1500, 700);

//bgi = createSprite(750,350);
//bgi.addImage("bgi", bgiImg);
//bgi.scale = 2;

balloon = createSprite(250,350,150,150);
balloon.addImage("hotairBalloon",balloonImg);
balloon.scale = 0.5;

obstaclesBottomGroup = new Group()
obstacleGroup = new Group()

}

function draw(){
    background(0);
    
    if(gameState==="play"){

        image(bgiImg, -displayWidth+200, 0, displayWidth*8, displayHeight)
        
        balloon.x = camera.x;

        // balloon should go up when "space" key is pressed
        if(keyDown("space")){
            balloon.velocityY = -6;
        }
        
        // moving the balloon towards the right
        if(keyDown("right")){
            //balloon.x = balloon.x + 5;
            camera.x = camera.x + 10;
        }
        
        // adding gravity
        balloon.velocityY = balloon.velocityY + 2;

        ObstaclesTop()
        ObstacleBottom()

        drawSprites();

        
        textSize(25)
        fill("black")
        text("Press space to not allow the balloon to fall",(camera.x-700),height-50)
        text("Press right arrow key to move towards the end line and win",(camera.x-700),height-80)

        textSize(30)
        fill("black")
        stroke("white")
        strokeWeight(5)
        text("Score: "+score,(camera.x-700),50)

        if(camera.x === 9200||balloon.y>height||obstaclesBottomGroup.isTouching(balloon)||obstacleGroup.isTouching(balloon)){
            gameState = "end";
  
        }
    }

    if(gameState==="end"){
        background("blue")
        obstacleGroup.destroyEach();
        obstaclesBottomGroup.destroyEach();
        balloon.destroy();
        drawSprites();
    }

    

}



function ObstaclesTop(){
    if(frameCount%150===0){
        obstacleTop = createSprite((camera.x+500),50,40,50);
        obstacleTop.addImage(birdImg);
        obstacleTop.y = Math.round(random(20, 200))
        obstacleTop.x += 200;
        //obstacleTop.velocityX = -3;
        obstacleTop.scale = 0.3;
        //obstacleTop.lifetime = 500;
        obstacleGroup.add(obstacleTop);
        
    }

}

function ObstacleBottom(){
    if(World.frameCount % 190 === 0) {
        ObstaclesBottom = createSprite((camera.x+500),650,40,50);
        ObstaclesBottom.addImage(lPostImg);
        //ObstaclesBottom.y = Math.round(random(20, 200))
        ObstaclesBottom.x+=200;
        ObstaclesBottom.scale = 0.2;
        ObstaclesBottom.lifetime = 500;
        obstaclesBottomGroup.add(ObstaclesBottom);
    }

}