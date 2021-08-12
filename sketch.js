//Create variables here
var dog, happydog;
var foods,foodStock;
var database;
var Dog;
var feedFood,addFood, fedTime, lastFed;
var FOOD;
function preload()
{
  dog = loadImage("images/Dog.png")
  happydog = loadImage("images/happydog.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500,500);

  FOOD = new Food();

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  Dog = createSprite(250,380,0,0);
  Dog.addImage(dog)
  Dog.scale=0.3;

  feedFood=createButton("Feed the dog");
  feedFood.position(700,200);
  feedFood.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,200);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
background(46,139,87)
FOOD.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  textSize(20)
fill("white");
stroke("black");
text("Food:"+foods,230,100);
text("Note: Press up arrow to feed the dog milk!",75,50)
}
function readStock(data){
foods=data.val()
FOOD.updateFoodStock(foods);
}

function feedDog(){
  Dog.addImage(happydog);
  FOOD.updateFoodStock(FOOD.getFoodStock()-1);
  database.ref('/').update({
    food:FOOD.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    food:foods
  })
}

