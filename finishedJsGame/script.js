//stage1
var stage, canvas, sunShape, car, road, road1, road2, road3, road4, road5, lock = false, q, aLock = false, a1, a2, a3, a4, wrong = true, fix = false, shape1, shape2, shape3, shape4, shape5, levelT, levelS, levelNum, qWrong, qWrongShape, qWrongText, game = false, maxQuestions = 0, endShape, endText, gameOver = false, gameStart = true, questionCorrdinate = 230, questionIndex = 0, aa1, questions, keys, t1, t2, t3, t4, t5;
 
  var question1 = [], answer1 = [], answer2 = [], answer3 = [], answer4 = [], cA = [];
//stage2
var stage2, stage3, stage4, stage5, stage6;
var canvas2, canvas3, canvas4, canvas5, canvas6;

  
  
  function errData(err){
    console.log('Error!');
    console.log(err);
  }

function init() {
  var firebaseConfig = {
    apiKey: "AIzaSyD7Wl-hS9N61BCnH9TcFqwzrGjTJzHWPrI",
    authDomain: "jscargame-a4aa0.firebaseapp.com",
    databaseURL: "https://jscargame-a4aa0.firebaseio.com",
    projectId: "jscargame-a4aa0",
    storageBucket: "jscargame-a4aa0.appspot.com",
    messagingSenderId: "271532802757",
    appId: "1:271532802757:web:c2c11fbdc89cc17fa166ac",
    measurementId: "G-L2D3RSV240"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //console.log(firebase);
  var database = firebase.database();
  var ref = database.ref('game');
  var scoreRef = ref.child('score');
  var questionRef = ref.child('question');
  questionRef.on('value', gotData, errData);
  function gotData(data){
    
    questions = data.val();
    keys = Object.keys(questions);
    console.log(keys);
    maxQuestions = keys.length;
    
    for(var i = 0; i < keys.length; i++){
      var k = keys[i];
      question1[i] = questions[k].question;
      answer1[i] = questions[k].aa1;
      answer2[i] = questions[k].aa2;
      answer3[i] = questions[k].aa3;
      answer4[i] = questions[k].aa4;
      cA[i] = questions[k].correct;
    }
   t1.text = answer1[0];
   t2.text = answer2[0];
   t3.text = answer3[0];
   t4.text = answer4[0];
   t5.text = question1[0];
   questionCorrdinate = cA[0];
   questionIndex++;
    
  }
  
  
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
    console.log("car.x = " + car.x);
    console.log("correct = " + cA[questionIndex]);
    roadLoop();
    carMovement();
    lockTrue();
    if(gameStart){
     
      startScreen();
      window.addEventListener("click", function(event) { 
        
        stage.removeAllChildren();
        stage.addChild(road, road2, road3, levelS, levelT, qWrongShape, qWrongText, car, a1, a2, a3, a4);
        gameStart = false;
        }, false);
    }
  else  if(gameOver){
      
    }
  else  if(levelNum == (maxQuestions + 1)){
   
     endGame();
     var data1 = {
       totalWrong: qWrong,
       totalQuestions: maxQuestions,
       score: maxQuestions - qWrong
     }
     scoreRef.push(data1);
     gameOver = true;
     
    }
  else  if (aLock == true) {
    if(answerCorrect()){
      wrong = false;
    }
    else{
      wrong = true;
    }
      reset();
    }
    
    stage.update();
    stage2.update();
    stage3.update();
    stage4.update();
    stage5.update();
    stage6.update();
    
  }

}
function answerCorrect(){
  if(questionCorrdinate == car.x){
    return true;
  }
  else{
    return false;
  }
}
function startScreen(){
  startShape = new createjs.Shape();
  startText = new createjs.Text();
  startShape.graphics.beginFill("grey").drawRect(0, 0, 900, 650);
  startText.text = "please mouse click the grey box to start the game!!!";
  startText.font = "30px Arial";
  startText.x = 130;
  startText.y = 300;
  stage.addChild(startShape, startText);
  
  
}
function endGame(){
  
  stage.removeAllChildren();
  stage.removeAllChildren();
  //stage2.removeAllChildren();
  //stage3.removeAllChildren();
  //stage4.removeAllChildren();
  //stage5.removeAllChildren();
  endShape = new createjs.Shape();
  endText = new createjs.Text();
  endShape.graphics.beginFill("grey").drawRect(0, 0, 900, 650);
  endText.text = "Thank you for playing \n \n total incorrct answers: " + qWrong + "\n refresh to play again!";
  endText.font = "30px Arial";
  endText.x = 300;
  endText.y = 300;
  stage.addChild(endShape, endText);
  stage.update();
  
  

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
  qWrong = 0;
  qWrongShape = new createjs.Shape();
  qWrongText = new createjs.Text();
  levelS = new createjs.Shape();
  levelT = new createjs.Text();
  levelS.graphics.beginFill("grey").drawRect(40, 135, 70, 70);
  qWrongShape.graphics.beginFill("grey").drawRect(30, 250, 100, 70);
  levelT.text = "Q: " + levelNum;
  qWrongText.text = "Wrong: " + qWrong;
  qWrongText.font = "20px Arial";
  qWrongText.color = "white";
  levelT.font = "30px Arial";
  levelT.color = "white";
  levelT.x = 45;
  levelT.y = 155;
  qWrongText.x = 30;
  qWrongText.y = 260;


   shape1 = new createjs.Shape();
   shape1.graphics.beginFill("green").drawRect(0,0,225, 400);
  
    shape2 = new createjs.Shape();
   shape2.graphics.beginFill("yellow").drawRect(0,0,225, 400);

    shape3 = new createjs.Shape();
   shape3.graphics.beginFill("yellow").drawRect(0,0,225, 400);

    shape4 = new createjs.Shape();
   shape4.graphics.beginFill("yellow").drawRect(0,0,225, 400);
   shape5 = new createjs.Shape();
   shape5.graphics.beginFill("yellow").drawRect(0,0,225, 400);

   
    t1 = new createjs.Text();
   t1.font = "15px Arial";
   t1.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

  t2 = new createjs.Text();
   t2.font = "15px Arial";
   t2.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

  t3 = new createjs.Text();
   t3.font = "15px Arial";
   t3.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   t4 = new createjs.Text();
   t4.font = "15px Arial";
   t4.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   t5 = new createjs.Text();
   t5.font = "15px Arial";
   t5.text = "exampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample";

   
    t1.text = formatString(t1.text, "A)");
    t2.text = formatString(t2.text, "B)");
    t3.text = formatString(t3.text, "C)");
    t4.text = formatString(t4.text, "D)");
    t5.text = formatString(t5.text, "Q)");
    


   
   stage2.addChild(shape1, t1);
   stage3.addChild(shape2, t2);
   stage4.addChild(shape3, t3);
   stage5.addChild(shape4, t4);
   stage6.addChild(shape5, t5);

   

  
  
 
  
  road = new createjs.Bitmap("road.png");
  road2 = new createjs.Bitmap("road.png");
  road3 = new createjs.Bitmap("road.png");
  road4 = new createjs.Bitmap("road.png");
  road5 = new createjs.Bitmap("road.png");
  road4.y = -1950;
  road3.y = -1300;
  road2.y = -650;
  road.y = 0;


  stage.addChild(road, road2, road3, levelS, levelT, qWrongShape, qWrongText);

  


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
      qWrong++;
      qWrongText.text = "Wrong: " + qWrong;
      aLock = false;
      car.rotation = 0;
      car.y = 400;
    }
  }
  else {
if(car.y == 400){
  aLock = false;
  t1.text =  answer1[questionIndex];
  t2.text =  answer2[questionIndex];
  t3.text =  answer3[questionIndex];
  t4.text =  answer4[questionIndex];
  t5.text = question1[questionIndex];
  questionCorrdinate = cA[questionIndex]
  questionIndex++;
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

