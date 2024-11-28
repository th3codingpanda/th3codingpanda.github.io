const numbers = [0, 0, 0, 0, 0];
const id = ["dice1", "dice2", "dice3", "dice4", "dice5"];
const button_id = ["button1","button2","button3","button4","button5"]
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
const first_half = [];
const second_half = [];
let playerturn = 1;
let amountplayers = 2;
let turn_ended = false;

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
}
function players() {
  //if(turn_ended == true){
  times_rolled = 0;
  if (playerturn == amountplayers) {
    playerturn = 1;
  } else {
    playerturn++;
  }
  for (let i = 0; i < 5; i++) {
    reroll[i] = true;
    numbers[i] = 0;
  }
  document.getElementById("playerturn").innerHTML = "Playerturn = " + playerturn;
  update();
  //}
}
function update() {
  for (let j = 0; j < 5; j++) {
    let dice = "Dice" + (j + 1) + " = " + numbers[j];
    console.log(dice);
    document.getElementById(id[j]).src = number_rolled[numbers[j]];
    document.getElementById(id[j]).alt = dice;
    if(!reroll[j])
      {
        document.getElementById(button_id[j]).className = "pressed"
      }
      else{document.getElementById(button_id[j]).className = "not_pressed"}
    
  }
}
