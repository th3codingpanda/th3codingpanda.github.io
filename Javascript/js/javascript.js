const numbers = [0, 0, 0, 0, 0];
var dice_numbers = 0;

function roll() {
  for (var i = 0; i <5; i++) {
    var dice = Math.floor(Math.random() * 6) + 1;
    switch (dice) {
      case 1:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
      case 2:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
      case 3:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
      case 4:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
      case 5:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
      case 6:
        numbers[dice_numbers] = dice;
        dice_numbers++;
        break;
    }
  }
  dice_numbers=0;
  document.getElementById("p1").innerHTML =
    "dice 1=" +
    numbers[0] +
    "dice 2=" +
    numbers[1] +
    "dice 3=" +
    numbers[2] +
    "dice 4=" +
    numbers[3] +
    "dice 5=" +
    numbers[4]
}
