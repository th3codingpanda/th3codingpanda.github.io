const numbers = [0, 0, 0, 0, 0];
const id = ["dice1", "dice2", "dice3", "dice4", "dice5"];
const reroll = [true, true, true, true, true];
console.log(arr1);
function roll() {
  // Roll dice and store result :D
  for (let i = 0; i < 5; i++) {
    if (reroll[i]) {
      numbers[i] = Math.floor(Math.random() * 6) + 1;
    }
  }
  update();
}
function update() {
  for (let j = 0; j < 5; j++) {
    let dice = "Dice" + (j + 1) + " = ";
    document.getElementById(id[j]).innerHTML = dice + numbers[j];
  }
}
function keep_or_roll()
{

}
