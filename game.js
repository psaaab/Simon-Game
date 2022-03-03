
// game variables and arrays

var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// the game starts here

$("body").keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
    
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level);
    level++;
}

// user interaction with the buttons

$($("div.btn").click(function (event) {
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}));

// function for playing button sounds and wrong answer sound

function playSound(name) {
    var buttonSound = new Audio("./sounds/" + name + ".mp3");
    buttonSound.play();
}

// button animation for user clicking it

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout (function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// checking answers

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
            }, 1000);
      }} else {

        playSound("wrong");
  
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}