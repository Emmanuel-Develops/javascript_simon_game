// const colorArray = ["green", "red", "yellow", "blue"];
// let level = 0;
// let highScore = 0;
// let randColorSequence = [];
// let mySequence = [];

// // get and animate a random color
// function getRandColor() {
//   let randNum = Math.floor(Math.random() * 4);
//   const randColor = colorArray[randNum];
//   randColorSequence.push(randColor);
//   let randColorDiv = document.querySelector(`#${randColor}`);
//   console.log(randColorDiv);

//   animatePress(randColorDiv);
// }

// // animate key
// function animatePress(colorDiv) {
//   colorDiv.classList.add("pressed");
//   colorDiv.classList.add("pressed");
//   setTimeout(() => {
//     colorDiv.classList.remove("pressed");
//   }, 300);
// }

// // play sound
// function playSound(sound) {
//   let newAudio = new Audio(`sounds/${sound}.mp3`);
//   newAudio.play();
// }

// document.addEventListener("keypress", function () {
//   // level = 0 at the start of the code, and set to 0 if the game fails, to try again
//   // it's like a loop based on the event listener
//   if (level == 0) {
//     level++;
//     document.querySelector("h1").textContent = `level ${level}`;
//     gameStart(level);
//   }
// });

// function gameStart(level) {
//   setDelay((document.querySelector("h1").textContent = `level ${level}`), 2000);
//   setTimeout(() => {
//     getRandColor();
//   }, 1000);

//   // I added the event listener here and not global scoped because I want an eventlistener only when i've started the game
//   let myClick = document.querySelectorAll(".btn");
//   myClick.forEach((button) => {
//     button.addEventListener("click", clickSeq);
//   });
// }

// // Apparently I can't use the iterator placeholder 'button' outside the function
// // So i used 'this' in place
// // this function is clicked if one of the four buttons is pressed
// function clickSeq() {
//   let currentClick = this.getAttribute("id");
//   mySequence.push(currentClick);
//   animatePress(this);
//   //   console.log(this);
//   if (mySequence.length == level) {
//     checkSequence();
//   }
// }

// // If the length of the clicked colors (i.e number of colors clicked is equal) to the length
// // of the generated random colors, this function is called to check if the arrays are the same
// function checkSequence() {
//   if (mySequence.toString() === randColorSequence.toString()) {
//     console.log("correct, proceed");
//     level++;
//     mySequence = [];
//     gameStart(level);
//   } else {
//     gameOver();
//   }
// }

// // If the arrays aren't the same this function is called, it resets all arrays and level
// // Its a loop as from the first condition if a key is pressed and (level = 0) then run the sequence again
// // The top if function works solely because there's a event listener on when a key is pressed
// // then the function in the event listener is carried out because level is now 0
// function gameOver() {
//   playSound("wrong");
//   mySequence = [];
//   randColorSequence = [];
//   document.querySelector("h1").textContent = `Wrong, Your score is ${level} Press any key to try again`;
//   if (level > highScore) {
//     highScore = level;
//     test1.textContent = `Highscore: ${highScore}`;
//   }
//   level = 0;
// }

// // Add an HighScore element without html and update it
// test1 = document.createElement("h3");
// test1.textContent = `Highscore: 0`;
// test1.classList.add("highscore");
// document.body.append(test1);
// console.log(document.body.firstElementChild);
// console.log(test1);

// function setDelay(stuff, time) {
//   setTimeout(() => {
//     stuff;
//   }, time);
// }

// Same code as above but with jQuery //
const colorArray = ["green", "red", "yellow", "blue"];
let level = 0;
let highScore = 0;
let randColorSequence = [];
let mySequence = [];

// get and animate a random color
function getRandColor() {
  let randNum = Math.floor(Math.random() * 4);
  const randColor = colorArray[randNum];
  randColorSequence.push(randColor);
  //   let randColorDiv = document.querySelector(`#${randColor}`); - Vanilla JS
  let randColorDiv = $(`#${randColor}`);

  animatePress(randColorDiv);
}

// animate key
function animatePress(colorDiv) {
  // colorDiv.classList.add("pressed"); - vanilla JS
  colorDiv.addClass("pressed");
  setTimeout(() => {
    //   colorDiv.classList.remove("pressed"); - vanilla JS
    colorDiv.removeClass("pressed");
  }, 1500);
}

// play sound
function playSound(sound) {
  let newAudio = new Audio(`sounds/${sound}.mp3`);
  newAudio.play();
}

// Start game only when a key is pressed initially
$(document).keypress(function () {
  // level = 0 at the start of the code, and set to 0 if the game fails, to try again
  // it's like a loop based on the event listener
  if (level == 0) {
    $("h1").text(`Repeat the pattern`);
    gameStart(level);
  }
});

// This would be a loop the game comes back to after every success
function gameStart(level) {
  getRandColor();
  // Add event listener to the buttons
  $(".btn").click(clickSeq);
}

// Apparently I can't use the iterator placeholder 'button' outside the function
// So i used 'this' in place
// this function is clicked if one of the four buttons is pressed
function clickSeq(event) {
  console.log();
  let currentClick = event.target.classList[1];
  mySequence.push(currentClick);
  console.log(mySequence);
  playSound(currentClick);
  // initially it was mySequence.length >= level, but i changed it to level + 1,
  // because i want to start from 0 and if i do that, my sequence would be a value which is 1, i.e level + 1
  if (mySequence.length >= level + 1) {
    $(".btn").off("click");
    checkSequence();
  }
}

// If the length of the clicked colors (i.e number of colors clicked is equal) to the length
// of the generated random colors, this function is called to check if the arrays are the same
function checkSequence() {
  if (mySequence.toString() === randColorSequence.toString()) {
    console.log("correct, proceed");
    // Increment level
    level++;
    // Display current level
    $("h1").text(`level ${level}`);
    mySequence = [];
    gameStart(level);
  } else {
    gameOver();
  }
}

// If the arrays aren't the same this function is called, it resets all arrays and level
// Its a loop as from the first condition if a key is pressed and (level = 0) then run the sequence again
// The top if function works solely because there's a event listener on when a key is pressed
// then the function in the event listener is carried out because level is now 0
function gameOver() {
  playSound("wrong");
  mySequence = [];
  randColorSequence = [];
  document.querySelector("h1").textContent = `Wrong, Your score is ${level} Press any key to try again`;
  if (level > highScore) {
    highScore = level;
    test1.textContent = `Highscore: ${highScore}`;
  }
  level = 0;
}

// Add an HighScore element without html and update it
test1 = document.createElement("h3");
test1.textContent = `Highscore: 0`;
test1.classList.add("highscore");
document.body.append(test1);
console.log(document.body.firstElementChild);
console.log(test1);

function setDelay(stuff, time) {
  setTimeout(() => {
    stuff;
  }, time);
}
