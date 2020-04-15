document.addEventListener("DOMContentLoaded", function () {
  //variables
  var player;
  var name = document.getElementById('name');
  var startButton = document.getElementById('start-button');
  var startbox = document.getElementById('start-game')
  var top =document.getElementById('top');
  var gameArea= document.getElementById('game-area');
  var numGuesses = 0;
  var correctGuesses = 0;
  var ballPosition;
  var userGuess;

  //Function
  function genBallPosition(){
    ballPosition = Math.floor(Math.random() * 3);
  }

  function incCounters() {
    numGuesses += 1
    if(ballPosition === userGuess){
      correctGuesses += 1
    }
  }

  function calcAverage() {

  }

  function reset(){
    displayCounts()
    ballPosition = null;
    userGuess = null;
    gameArea.innerHTML = '';
    drawBoxes();
  }

  function reveal(){
    var userBox = document.getElementById('box-' + userGuess);
    userBox.className = userGuess === ballPosition ? 'Box reveal wins' : 'ball reveal'
    var boxes= document.getElementsByClassName('box');
    for (var i = 0; i < boxes.length; i++){
      boxes[i].removeEventListener('click',makeGuess);
    }
    setTimeout( function() {
      reset();
    },1000)

  }


  function displayCounts() {
    alert('You have guessed: ' + numGuesses);
    alert('Correct guesses: ' + correctGuesses)
  }


  function makeGuess (e) {
    genBallPosition();
    var id = e.target.id
    var numericPart = id.split("-")[1]
    userGuess = parseInt(numericPart);
    incCounters();
    reveal();
  }

  function drawBoxes(){
    for (var i = 0; i < 3; i++){
      var box= document.createElement('div');
      box.className = 'box';
      box.id = 'box-' + i;
      gameArea.append(box);
      box.addEventListener('click', makeGuess);
    }
  }

  function startGame(){
    player = name.value;
    startbox.className = 'hide';
    var label = document.createElement('p')
    label.innerHTML = 'Welcome ' + player;
    label.className = 'center';
    top.append(label); //Appending in Javascript is a way to insert content to the end of already existing elements
    drawBoxes();
  }

  //////////////////////////////////////////END OF FUNCTIONS/////////////////////////////////////////////////

  //listeners
  name.addEventListener('keyup', function (event) {
    if (event.target.value !== '') { //if the box is not blank then add the button
      startButton.className = '';
    }
    else {
      startButton.className = 'hide'; // if the box is not blank then hide the button
    }
  });

  startButton.addEventListener('click',startGame);
})