var dogimg, happyDog;
var database;
var dog;
var foodS, foodStock;

function preload()
{
	dogimg = loadImage("Dog.png")
  happyDog = loadImage("happydog.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(400, 250, 20, 20);
  dog.addImage(dogimg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
}


function draw() {
  background(46, 139, 87)
  
  if (keyWentDown(UP_ARROW) && foodS > 0){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  if (foodS === 0){
    dog.addImage(dogimg);
  }

  if (keyWentDown(DOWN_ARROW) && foodS === 0){
    reviveStock(foodS);
  }

  drawSprites();
  textSize(20)
  fill(255);
  text("Food Stock: " + foodS, 50, 50);
  text("Clickup arrow to feed dog", 50, 75);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
   if (x <= 0){
    x = 0;
  } 
  else{
    x = x - 1;
  }

  database.ref('/').update({
    'Food': x
  })
}

function showError(){

}

