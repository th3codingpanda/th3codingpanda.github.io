let amountplayers = localStorage.getItem("amountplayers");
let darkmode = localStorage.getItem("darkmode");
const numbers = [0, 0, 0, 0, 0];
const id = ["dice1", "dice2", "dice3", "dice4", "dice5"];
const button_id = ["button1", "button2", "button3", "button4", "button5"];
const reroll = [true, true, true, true, true];
const number_rolled = [
  "images/eyeless.png",
  "images/one_eye.png",
  "images/two_eyes.png",
  "images/three_eyes.png",
  "images/four_eyes.png",
  "images/five_eyes.png",
  "images/six_eyes.png",
];
let times_rolled = 0;
const upper_section = [][(0, 0, 0, 0, 0, 0, false)];
// 1 2 3 4 5 6 check if score is 63 or above and reward 35 points
const lower_section = [][(0, 0, false, false, false, false, 0, false)];
/* 3 of a kind, 4 of a kind ,3 and 2 of a kind , sequence of 4 (1234/2345/3456), 
sequence of 5(12345/23456) 5 of a kind, chance any dice added together,
 5 of a kind if 5 of a kind is filled */
let playerturn = 1;

let turn_ended = false;
var numberplayersselected = 0;
function roll() {
  // Roll dice and store result :D
  if (times_rolled < 3) {
    for (let i = 0; i < 5; i++) {
      if (reroll[i]) {
        numbers[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
    times_rolled++;
    document.getElementById("turnsleft").innerHTML =
      "Turns left: " + (3 - times_rolled);

    update();
  }
}
function keep_or_roll(dice_clicked) {
  console.log(dice_clicked);
  for (let i = 0; i < 5; i++) {
    if (dice_clicked == id[i]) {
      if (reroll[i] && times_rolled > 0) {
        reroll[i] = false;
      } else {
        reroll[i] = true;
      }
    }
  }
  update();
}
function players() {
  //if(turn_ended == true){
  times_rolled = 0;
  if (playerturn == amountplayers) {
    playerturn = 1;
    console.log("Player=" + playerturn);
    console.log("Playeramount=" + amountplayers);
  } else {
    playerturn++;
    console.log("Player=" + playerturn);
    console.log("Playeramount=" + amountplayers);
  }
  for (let i = 0; i < 5; i++) {
    reroll[i] = true;
    numbers[i] = 0;
  }
  document.getElementById("playerturn").innerHTML =
    "Playerturn = " + playerturn;
  document.getElementById("turnsleft").innerHTML =
    "Turns left: " + (3 - times_rolled);
  update();
  //}
}
function update() {
  for (let j = 0; j < 5; j++) {
    let dice = "Dice" + (j + 1) + " = " + numbers[j];
    console.log(dice);
    document.getElementById(id[j]).src = number_rolled[numbers[j]];
    document.getElementById(id[j]).alt = dice;
    if (!reroll[j]) {
      document.getElementById(button_id[j]).className = "pressed";
    } else {
      document.getElementById(button_id[j]).className = "not_pressed";
    }
  }
}
function selectplayersamount() {
  numberplayersselected = document.getElementById("inputtext1").value;
  if (isNaN(numberplayersselected) || numberplayersselected <= 0) {
    alert("Input a valid number");
    console.log(numberplayersselected);
  } else {
    window.location.href = "yahtzee.html";
    console.log(numberplayersselected);
    localStorage.setItem("amountplayers", Math.floor(numberplayersselected));
    console.log(amountplayers);
  }
}
function darklightmode() {
  var currently = document.getElementById("body").className;
  if (currently == "lightmode") {
    document.getElementById("body").className = "darkmode";
    localStorage.setItem("darkmode", true);
    darkmode = localStorage.getItem("darkmode");
    console.log("darkmode=" + darkmode);
  } else if (currently == "darkmode") {
    document.getElementById("body").className = "lightmode";
    localStorage.setItem("darkmode", false);
    darkmode = localStorage.getItem("darkmode");
    console.log("darkmode=" + darkmode);
  }
}
function darklightmodestartup() {
  if (darkmode == "true") {
    document.getElementById("body").className = "darkmode";
    document.getElementById("dark-lightmode").checked = true;
    console.log("gojo");
  } else {
    document.getElementById("body").className = "lightmode";
    console.log("goku");
    document.getElementById("dark-lightmode").checked = false;
  }
}
function scoreboardupdate() {
  for (let i = 0; i < 7; i++) {
    console.log(upper_section[playerturn[i]]);
  }
}
