const submit = document.querySelector('#guess-value');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const minInput = document.querySelector('.min-num');
const maxInput = document.querySelector('.max-num');
let count = 0;
let minNum;
let maxNum;

minNum = Number(minInput.value);
maxNum = Number(maxInput.value);

function randomGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let randomNumber = randomGenerator(minNum, maxNum);
console.log(randomNumber);

function messageContinueGame(msg) {
  message.textContent = msg;
  guessInput.value = '';
  message.style.color = '#D50515';
}

function messageEndGame(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  guessInput.disabled = true;
  submit.value = 'Play again';
  guessInput.style.border = `2px solid ${color}`;
}

function matchNumbers() {
  const guess = Number(guessInput.value);
  if (guess < minNum || guess > maxNum) {
    messageContinueGame(
      `Please enter a number between ${minNum} and ${maxNum}.`
    );
  } else if (guess === randomNumber) {
    messageEndGame(`${guess} is correct!`, '#00D673');
  } else {
    count += 1;
    if (count < 2) {
      messageContinueGame(
        `${guess} is not correct, you have ${3 - count} guesses left!`
      );
    } else if (count === 2) {
      messageContinueGame(
        `${guess} is not correct, you have ${3 - count} guess left!`
      );
    } else {
      messageEndGame(
        `Game Over! The correct answer was ${randomNumber}.`,
        '#D50515'
      );
    }
  }
}

function resetGame() {
  submit.value = 'submit';
  count = 0;
  guessInput.value = '';
  guessInput.disabled = false;
  guessInput.style.border = '';
  message.textContent = '';
  randomNumber = randomGenerator(minNum, maxNum);
  console.log(randomNumber);
}

function changeRangeInput() {
  minNum = Number(minInput.value);
  maxNum = Number(maxInput.value);
  resetGame(minNum, maxNum);
}

function loadEventListeners() {
  submit.addEventListener('click', () => {
    if (submit.value === 'submit') {
      matchNumbers();
    } else {
      resetGame();
    }
  });

  minInput.addEventListener('input', changeRangeInput);
  maxInput.addEventListener('input', changeRangeInput);
}

loadEventListeners();