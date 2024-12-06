let amountplayers = localStorage.getItem("amountplayers");
let darkmode = localStorage.getItem("darkmode");
const numbers = [0, 0, 0, 0, 0];
const numberseyes = [0, 0, 0, 0, 0, 0];
const specials = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//bonus 3 and 4 of a kind, small and large straight, full house chance, yahtzee and bonus yahtzee.
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
let score = [];
let score_used = [];
score[0] = [];
score[1] = [];
score_used[0] = [];
score_used[1] = [];

const lower_section = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
  if (turn_ended == true) {
    times_rolled = 0;
    if (playerturn == amountplayers) {
      playerturn = 1;
      console.log("Player=" + playerturn);
      console.log("Playeramount=" + amountplayers);
      turn_ended = false;
    } else {
      playerturn++;
      console.log("Player=" + playerturn);
      console.log("Playeramount=" + amountplayers);
      turn_ended = false;
    }

    for (let i = 0; i < 5; i++) {
      reroll[i] = true;
      numbers[i] = 0;
    }
    update();
  }
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
  document.getElementById("turnsleft").innerHTML =
    "Turns left: " + (3 - times_rolled);
  document.getElementById("playerturn").innerHTML =
    "Playerturn = " + playerturn;
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
    console.log("Darkmode = true");
  } else {
    document.getElementById("body").className = "lightmode";
    console.log("Darkmode = false");
    document.getElementById("dark-lightmode").checked = false;
  }
  //remembers what last theme was and changes it to that
}
function scoreboardtally() {
  for (let i = 0; i < 6; i++) {
    numberseyes[i] = 0;
  }
  for (let i = 0; i < 9; i++) {
    specials[i] = 0;
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
  for (let i = 0; i < 6; i++) {
    if (numberseyes[i] == 3) {
      specials[0] = numberseyes[i] * (i + 1);
      console.log("Three of a kind");
    }
    if (numberseyes[i] == 4){
      specials[1] = numberseyes[i] * (i + 1);
      console.log("Four of a kind");
    }
    if (numberseyes[i] == 5){
      specials[5] = 50
      console.log("Yahtzee");
    }
    if (numberseyes[i] == 5 && score_used[1][playerturn-1][5]== true){
      specials[7] = 100
      console.log("BONUS Yahtzee");
    }
  }

  console.log(numberseyes);
  scoreboardupdate();
}
function scoreboardupdate() {
  let array = document.getElementsByClassName("upper_scoreboard");
  let array2 = document.getElementsByClassName("lower_scoreboard");
  if (score_used[0][playerturn - 1][0] == false) {
    array[0].style = "text-decoration:none;";
    array[0].innerHTML = "Total 1's: " + numberseyes[0] * 1 + " ";
  } else {
    array[0].style = "text-decoration:line-through;";
    array[0].innerHTML = "Total 1's: " + score[0][playerturn - 1][0];
  }
  if (score_used[0][playerturn - 1][1] == false) {
    array[1].style = "text-decoration:none;";
    array[1].innerHTML = "Total 2's: " + numberseyes[1] * 2 + " ";
  } else {
    array[1].style = "text-decoration:line-through;";
    array[1].innerHTML = "Total 2's: " + score[0][playerturn - 1][1];
  }
  if (score_used[0][playerturn - 1][2] == false) {
    array[2].style = "text-decoration:none;";
    array[2].innerHTML = "Total 3's: " + numberseyes[2] * 3 + " ";
  } else {
    array[2].style = "text-decoration:line-through;";
    array[2].innerHTML = "Total 3's: " + score[0][playerturn - 1][2];
  }
  if (score_used[0][playerturn - 1][3] == false) {
    array[3].style = "text-decoration:none;";
    array[3].innerHTML = "Total 4's: " + numberseyes[3] * 4 + " ";
  } else {
    array[3].style = "text-decoration:line-through;";
    array[3].innerHTML = "Total 4's: " + score[0][playerturn - 1][3];
  }
  if (score_used[0][playerturn - 1][4] == false) {
    array[4].style = "text-decoration:none;";
    array[4].innerHTML = "Total 5's: " + numberseyes[4] * 5 + " ";
  } else {
    array[4].style = "text-decoration:line-through;";
    array[4].innerHTML = "Total 5's: " + score[0][playerturn - 1][4];
  }
  if (score_used[0][playerturn - 1][5] == false) {
    array[5].style = "text-decoration:none;";
    array[5].innerHTML = "Total 6's: " + numberseyes[5] * 6 + " ";
  } else {
    array[5].style = "text-decoration:line-through;";
    array[5].innerHTML = "Total 6's: " + score[0][playerturn - 1][5];
  }
  if (score_used[0][playerturn - 1][6] == false) {
    array[6].innerHTML = "Bonus(63+): ";
  }
  if (score_used[0][playerturn - 1][7] == false) {
    array[7].innerHTML = "Total upper section: " + total_uppersection;
  }
  if (score_used[0][playerturn - 1][8] == false) {
    array[8].innerHTML = "Total: " + total;
  }
  if (score_used[1][playerturn - 1][0] == false) {
    array2[0].style = "text-decoration:none;";
    array2[0].innerHTML = "Three of a kind: " + specials[0];
  } else {
    array2[0].style = "text-decoration:line-through;";
    array2[0].innerHTML = "Three of a kind: " + score[1][playerturn - 1][0];
  }
  if (score_used[1][playerturn - 1][1] == false) {
    array2[1].style = "text-decoration:none;";
    array2[1].innerHTML = "Four of a kind: " + specials[1];
  } else {
    array2[1].style = "text-decoration:line-through;";
    array2[1].innerHTML = "Four of a kind: " + score[1][playerturn - 1][1];
  }
  if(score_used[1][playerturn - 1][2] == false){
    array2[2].style = "text-decoration:none;";
    array2[2].innerHTML = "Four of a kind: " + specials[2];
  }
  // todo add bonus ,total upper section ,total lower section ,total ,4 of a kind
  // full house, small straight, large straight, yahtzee, bonus yahtzee , chance
}
function scoreboard(pressed) {
  let activated = false;
  if (!turn_ended) {
    for (let i = 0; i < 9; i++) {
      if (score_used[0][playerturn - 1][i] == false) {
        if (pressed == "upper_scoreboard: " + (i + 1))
          if (i < 6) {
            score[0][playerturn - 1][i] = numberseyes[i] * (i + 1);
            score_used[0][playerturn - 1][i] = true;
            activated = true;
            console.log(i + 1 + " " + score[i]);
          }
      }
      // upperscore above lowerscore below
      if (score_used[1][playerturn - 1][i] == false) {
        if (pressed == "lower_scoreboard: " + (i + 1)) {
          if (i == 0) {
            score[1][playerturn - 1][0] = specials[0];
            score_used[1][playerturn - 1][0] = true;
            activated = true;
            console.log(i + 1 + " " + score[1][playerturn - 1]);
          }
          if (i == 1) {
            score[1][playerturn - 1][1] = specials[1];
            score_used[1][playerturn - 1][1] = true;
            activated = true;
            console.log(i + 1 + " " + score[1][playerturn - 1]);
          }
          if (i == 2) {
          }
          if (i == 3) {
          }
          if (i == 4) {
          }
          if (i == 5) {
          }
        }
      }
    }
  }
  if (activated) {
    turn_ended = true;
    times_rolled = 3;
    update();
  }
}

function initiate() {
  for (let i = 0; i < amountplayers; i++) {
    score[0].push(i);
    score[1].push(i);
    score_used[0].push(i);
    score_used[1].push(i);
    score[0][i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    score[1][i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // score 0 logs upperscore and 1 logs lowerscoreboard
    // log from left to right 1 2 3 4 5 6 bonus total upper section and total
    //log from left to right 3 of a kind, 4 of a kind, full house, small straight, large straight, yahtzee chance bonus yahtzee
    score_used[0][i] = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    score_used[1][i] = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    console.log(i + 1 + " " + score[0][i]);
    console.log(i + 1 + " " + score[1][i]);
    console.log(i + 1 + " " + score_used[0][i]);
    console.log(i + 1 + " " + score_used[1][i]);
  }
}
