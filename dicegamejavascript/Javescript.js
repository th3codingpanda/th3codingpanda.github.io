let dice = [0, 0, 0, 0];
let ids = ["dice1", "dice2", "dice3", "dice4"];
let images = [
  "Images/eyeless.png",
  "Images/one_eye.png",
  "Images/two_eyes.png",
  "Images/three_eyes.png",
  "Images/four_eyes.png",
  "Images/five_eyes.png",
  "Images/six_eyes.png",
];
let Roll = false;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function RollDice() {
  if (!Roll) {
    Roll = true;
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < dice.length; i++) {
        dice[i] = Math.floor(Math.random() * 6 + 1);
        console.log(dice);
      }
      Change();
      await delay(200);
    }
    Change();
    Roll = false;
    Score();
  }
}
function Change() {
  for (let i = 0; i < dice.length; i++) {
    document.getElementById(ids[i]).src = images[dice[i]];
  }
  document.getElementById("Your_dice").textContent =
    "Your dice: " + (dice[0] + dice[1]);
  document.getElementById("Their_dice").textContent =
    "Their dice: " + (dice[2] + dice[3]);
}
function Score() {
  if (dice[0] + dice[1] > dice[2] + dice[3]) {
    alert("You won by " + (dice[0] + dice[1] - (dice[2] + dice[3])));
  } else if (dice[0] + dice[1] == dice[2] + dice[3]) {
    alert("tie");
  } else {
    alert("you lost by " + (dice[2] + dice[3] - (dice[0] + dice[1])));
  }
}
