//game start on keypress
const colors = ["green", "red", "yellow", "blue"];
let gameActive = false;
let gamePattern = [];
let playerSelection = [];
let counter = 0;
let level = 0;

//click functionality, build players array
$(".btn").click((event) => {
  const colorPicked = this.event.target.id;
  playerSelection.push(colorPicked);

  $(`#${colorPicked}`).addClass("pressed");

  setTimeout(() => {
    $(`#${colorPicked}`).removeClass("pressed");
  }, 100);

  console.log(colorPicked);
  console.log(playerSelection);
  colorCheck();
});

$(document).on("keydown", () => {
  if (gameActive == false) {
    gameActive = true;
    selectColor();
  }
});

//color picking function
function selectColor() {
  //selects random color
  const randomColor = colors[Math.floor(Math.random() * 4)];

  //create sound container
  const colorSound = new Audio(`sounds/${randomColor}.mp3`);

  //display level and increase
  level++;
  $("#level-title").text(`Level ${level}`);
  //add chosen color to games pattern array
  gamePattern.push(randomColor);
  //play color sound
  colorSound.play();

  //color selected animation
  $(`#${randomColor}`).fadeOut(100).fadeIn(100);

  console.log(randomColor);
  console.log(gamePattern);
}

function colorCheck() {
  //compare gamePattern array with player selection
  if (playerSelection[counter] == gamePattern[counter]) {
    counter++;
    console.log("correct");
  } else {
    // console.log("Wrong");
    // counter = 0;
    // playerSelection = [];
    wrongChoice();
  }
  //when players array and games array are same length clear players array, reset counter and select next color
  if (playerSelection.length == gamePattern.length && gameActive) {
    playerSelection = [];
    counter = 0;
    setTimeout(() => {
      selectColor();
    }, 500);
  }

  //if WRONG, screen red/buzz sound, display 'you lose' header
}

function wrongChoice() {
  //buzz sound
  const buzzer = new Audio("sounds/wrong.mp3");
  buzzer.play();
  //red flash
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  //header change 'Game Over, Press Any Key to Restart'
  $("#level-title").text("Game Over, Press Any Key to Restart");

  //reset ALL variables counter, arrays, gameActive
  gameActive = false;
  gamePattern = [];
  playerSelection = [];
  counter = 0;
  level = 0;
}
