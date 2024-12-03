let amountplayers = localStorage.getItem("amountplayers");
let darkmode = localStorage.getItem("darkmode");
const numbers = [0, 0, 0, 0, 0];
const numberseyes = [0, 0, 0, 0, 0, 0];
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
let total_uppersection = 0;
let total_lowersection = 0;
let total = 0;

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
  //
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
  //Keeps turns in check and if it should reroll or not
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
  scoreboardtally();
  //Updates dice and if it can reroll or not
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
  //checks  amount of players selected
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
  //toggles dark or light mode
}
function darklightmodestartup() {
  if (darkmode == "true") {
    document.getElementById("body").className = "darkmode";
    if (typeof index !== "undefined") {
      document.getElementById("dark-lightmode").checked = true;
    }
    console.log("gojo");
  } else {
    document.getElementById("body").className = "lightmode";
    console.log("goku");
    document.getElementById("dark-lightmode").checked = false;
  }
  //remembers what last theme was and changes it to that
}
function scoreboardtally() {
  for (let i = 0; i < 6; i++) {
    numberseyes[i] = 0;
  }
  for (let i = 0; i < 5; i++) {
    if (numbers[i] == 1) {
      numberseyes[0]++;
    } else if (numbers[i] == 2) {
      numberseyes[1]++;
    } else if (numbers[i] == 3) {
      numberseyes[2]++;
    } else if (numbers[i] == 4) {
      numberseyes[3]++;
    } else if (numbers[i] == 5) {
      numberseyes[4]++;
    } else if (numbers[i] == 6) {
      numberseyes[5]++;
    }
  }
  console.log(numberseyes);
  scoreboardupdate();
}
function scoreboardupdate() {
  let array = document.getElementsByClassName("upper_scoreboard");
  array[0].innerHTML = "Total 1's: " + numberseyes[0] * 1;
  array[1].innerHTML = "Total 2's: " + numberseyes[1] * 2;
  array[2].innerHTML = "Total 3's: " + numberseyes[2] * 3;
  array[3].innerHTML = "Total 4's: " + numberseyes[3] * 4;
  array[4].innerHTML = "Total 5's: " + numberseyes[4] * 5;
  array[5].innerHTML = "Total 6's: " + numberseyes[5] * 6;
  array[6].innerHTML = "Bonus(63+): ";
  array[7].innerHTML = "Total upper section: " + total_uppersection;
  array[8].innerHTML = "Total: " + total;
}
function scoreboard() {}
