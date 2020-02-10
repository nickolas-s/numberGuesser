const submit = document.querySelector('#guess-value');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const optionsInputs = document.querySelectorAll('.spinner');
const options = {
  MINIMUM: 1,
  MAXIMUM: 10,
  CHANCES: 3,
};
let count = 0;
let randomNumber = randomGenerator(options.MINIMUM, options.MAXIMUM);
console.log(randomNumber);

function randomGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
  if (guess < options.MINIMUM || guess > options.MAXIMUM) {
    messageContinueGame(
      `Please enter a number between ${options.MINIMUM} and ${options.MAXIMUM}.`
    );
  } else if (guess === randomNumber) {
    messageEndGame(`${guess} is correct!`, '#00D673');
  } else {
    count += 1;
    if (count < options.CHANCES) {
      messageContinueGame(
        `${guess} is not correct, you have ${options.CHANCES - count} guess${
          count === options.CHANCES - 1 ? '' : 'es'
        } left!`
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
  randomNumber = randomGenerator(options.MINIMUM, options.MAXIMUM);
  console.log(randomNumber);
}

function handleOption(event) {
  const { value, name } = event.currentTarget;
  options[name] = parseFloat(value);
  resetGame(options.MINIMUM, options.MAXIMUM);
}

function checkInput() {
  if (submit.value === 'submit') {
    matchNumbers();
  } else {
    resetGame();
  }
}

function loadEventListeners() {
  submit.addEventListener('click', () => {
    checkInput();
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      checkInput();
    }
  });

  optionsInputs.forEach(input => input.addEventListener('input', handleOption));
}

loadEventListeners();
