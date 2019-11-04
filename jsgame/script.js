//stage1
var stage, canvas, sunShape, car, road, road1, road2, road3, road4, road5, lock = false, q, aLock = false, a1, a2, a3, a4, wrong = true, fix = false, shape1, shape2, shape3, shape4, levelT, levelS, levelNum;
//stage2
var stage2, stage3, stage4, stage5, stage6;
var canvas2, canvas3, canvas4, canvas5, canvas6;

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  canvas2 = document.getElementById("canvas2");
  stage2 = new createjs.Stage(canvas2);
  canvas3 = document.getElementById("canvas3");
  stage3 = new createjs.Stage(canvas3);
  canvas4 = document.getElementById("canvas4");
  stage4 = new createjs.Stage(canvas4);
  canvas5 = document.getElementById("canvas5");
  stage5 = new createjs.Stage(canvas5);
  canvas6 = document.getElementById("canvas6");
  stage6 = new createjs.Stage(canvas6);
  createBackGround();
  initcar();
  qAndA();
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", game);
  function game(e) {
    roadLoop();
    carMovement();
    lockTrue();

    if (aLock == true) {

      reset();
    }
    stage.update();
    stage2.update();
    stage3.update();
    stage4.update();
    stage5.update();
  }

}
function formatString(str, a){
  var num = 0;
var newString = a + " ";
for(var i = 0; i < str.length; i++){
  if((i - 25) == num){
    newString = newString +  str.substr(num, 25) + " \n ";
    num = i;
  }
}
return newString;
}

function createBackGround() {
  levelNum = 1;
  levelS = new createjs.Shape();
  levelT = new createjs.Text();
  levelS.graphics.beginFill("grey").drawRect(40, 135, 70, 70);
  levelT.text = "Q: " + levelNum;
  levelT.font = "30px Arial";
  levelT.color = "white";
  levelT.x = 45;
  levelT.y = 155;

   shape1 = new createjs.Shape();
   shape1.graphics.beginFill("green").drawRect(0,0,225, 400);
  
    shape2 = new createjs.Shape();
   shape2.graphics.beginFill("yellow").drawRect(0,0,225, 400);

    shape3 = new createjs.Shape();
   shape3.graphics.beginFill("yellow").drawRect(0,0,225, 400);

    shape4 = new createjs.Shape();
   shape4.graphics.beginFill("yellow").drawRect(0,0,225, 400);

   
   t1 = new createjs.Text();
   t1.font = "15px Arial";
   t1.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample ";

   t2 = new createjs.Text();
   t2.font = "15px Arial";
   t2.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   t3 = new createjs.Text();
   t3.font = "15px Arial";
   t3.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   t4 = new createjs.Text();
   t4.font = "15px Arial";
   t4.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   
    t1.text = formatString(t1.text, "A)");
    t2.text = formatString(t2.text, "B)");
    t3.text = formatString(t3.text, "C)");
    t4.text = formatString(t4.text, "D)");
    


   
   stage2.addChild(shape1, t1);
   stage3.addChild(shape2, t2);
   stage4.addChild(shape3, t3);
   stage5.addChild(shape4, t4);
   

  
  
 
  
  road = new createjs.Bitmap("road.png");
  road2 = new createjs.Bitmap("road.png");
  road3 = new createjs.Bitmap("road.png");
  road4 = new createjs.Bitmap("road.png");
  road5 = new createjs.Bitmap("road.png");
  road4.y = -1950;
  road3.y = -1300;
  road2.y = -650;
  road.y = 0;


  stage.addChild(road, road2, road3, levelS, levelT);

  


}
function generator() {
  q = new Question();
  q.setQ("what do you do at a stop sign");
  q.setAnswers("you stop", "you go", "you stop then go", "you floor it");
  return q.f();
}
function initcar() {
  var img = new Image();
  img.src = "Audi.png";

  car = new createjs.Bitmap(img);
  car.x = 230;
  car.y = 400;
  car.regX = car.regY = 128;
  stage.addChild(car);
}

function qAndA() {
  a1 = new createjs.Text("A", "50px Arial", "green");
  a1.x = 210;
  a1.y = 135;
  a2 = new createjs.Text("B", "50px Arial", "yellow");
  a2.x = 340;
  a2.y = 135;
  a3 = new createjs.Text("C", "50px Arial", "yellow");
  a3.x = 470;
  a3.y = 135;
  a4 = new createjs.Text("D", "50px Arial", "yellow");
  a4.x = 600;
  a4.y = 135;
  stage.addChild(a1, a2, a3, a4);
}



function roadLoop() {
  if (road.y < 650) {
    road.y += 5;
  }
  else {
    road.y = 0;
  }
  if (road.y < 650) {
    road2.y += 5;
  }
  else {
    road2.y = -650;
  }
  if (road.y < 650) {
    road3.y += 5;
  }
  else {
    road3.y = -1300;
  }
}

function carMovement() {

  window.addEventListener("keydown", key, false);

}
function reset() {
  if (wrong == true) {
    if (car.y < 600) {
      console.log("car.y = " + car.y);
      car.rotation += 5;
      car.y += 4;
    }
    else {
      aLock = false;
      car.rotation = 0;
      car.y = 400;
    }
  }
  else {
if(car.y == 400){
  aLock = false;
  a1.y = 135;
  a2.y = 135;
  a3.y = 135;
  a4.y = 135;
  levelNum++;
  levelT.text = "Q: " + levelNum;
  
}
  
   else if (car.y >= -50) {
      if (car.y == -50) {
        car.y = 650;
      } 
      else {
      car.y -= 5;
      if(car.y >= -50 && car.y <= 400){
      a1.y += 5;
      a2.y += 5;
      a3.y += 5;
      a4.y += 5;
      }
      else if(car.y <= 650 && car.y >= 400){
      a1.y -= 5;
      a2.y -= 5;
      a3.y -= 5;
      a4.y -= 5;
      }
      }
      }
    }
  }
  


function key(e) {
  var code = e.keyCode;
  if (car.y == 100) {
    console.log("stopped movement");
  }
  else if (code == 39) {
    switch (car.x) {
      case 230:
        car.x = 360;
        changeColor(car.x);
        break;
      case 360:
        car.x = 490;
        changeColor(car.x);
        break;
      case 490:
        car.x = 610;
        changeColor(car.x);
        break;
      case 610:
        car.x = 230;
        changeColor(car.x);
        break;
    }
  }
  else if (code == 37) {
    switch (car.x) {
      case 230:
        car.x = 610;
        changeColor(car.x);
        break;
      case 360:
        car.x = 230;
        changeColor(car.x);
        break;
      case 490:
        car.x = 360;
        changeColor(car.x);
        break;
      case 610:
        car.x = 490;
        changeColor(car.x);
        break;
    }
  }
  else if (code == 13) {
    lock = true;
  }


}
function changeColor(cxc) {
  switch (cxc) {
    case 230:
      a1.color = "green";
      shape1.graphics.beginFill("green").drawRect(0,0,225, 400);
      correctColor(a1.x);
      break;
    case 360:
      a2.color = "green";
      shape2.graphics.beginFill("green").drawRect(0,0,225, 400);
      correctColor(a2.x);
      break;
    case 490:
      a3.color = "green";
      shape3.graphics.beginFill("green").drawRect(0,0,225, 400);
      correctColor(a3.x);
      break;
    case 610:
      a4.color = "green";
      shape4.graphics.beginFill("green").drawRect(0,0,225, 400);
      correctColor(a4.x);
      break;

  }
}
function correctColor(textPos) {
  if (textPos == 210) {
    if (a4.color == "green") {
      a4.color = "yellow";
      shape4.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
    else {
      a2.color = "yellow";
      shape2.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
  }
  else if (textPos == 340) {
    if (a1.color == "green") {
      a1.color = "yellow";
      shape1.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
    else {
      a3.color = "yellow";
      shape3.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
  }
  else if (textPos == 470) {
    if (a2.color == "green") {
      a2.color = "yellow";
      shape2.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
    else {
      a4.color = "yellow";
      shape4.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
  }
  else if (textPos == 600) {
    if (a3.color == "green") {
      a3.color = "yellow";
      shape3.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
    else {
      a1.color = "yellow";
      shape1.graphics.beginFill("yellow").drawRect(0,0,225, 400);
    }
  }
}



function lockTrue() {
  if (lock == true && aLock == false) {
    if (car.y > 100) {
      car.y -= 2;
      console.log(car.y);
    }
    else {
      console.log("else");
      aLock = true;
      lock = false;
    }
  }
}



