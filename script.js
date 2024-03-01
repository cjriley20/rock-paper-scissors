const Options = ['Rock', 'Paper', 'Scissors'];

// Get screen elements.
const buttonDiv = document.querySelector('div.buttons');
const buttons = buttonDiv.children;

const resultDiv = document.querySelector('div.result');

const scoreDiv = document.querySelector('div.score');

// Initialize game.
let playerScore = 0;
let computerScore = 0;

const numberOfRounds = 5;

let round = 0;

// Initialize buttons.
for (let i = 0; i < 3; i++) {
  buttons[i].textContent = Options[i];

  buttons[i].addEventListener('click', (e) => {
    const playerChoice = e.target.textContent;
    const computerChoice = getComputerChoice();

    const result = playRound(playerChoice, computerChoice);

    // Update screen with results.
    updateGame(result);
  });
}

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  return Options[choice];
}

function toChoice(word) {
  // Convert to canonical form: lower case with first letter capitalized.
  const firstLetter = word.charAt(0);
  const restOfWord = word.slice(1);

  return firstLetter.toUpperCase() + restOfWord.toLowerCase();
}

function getPlayerChoice() {
  let isChoiceOk = false;
  let choice = '';

  while (!isChoiceOk) {
    let input = prompt('Choose Rock, Paper, or Scissors');
    choice = toChoice(input);

    isChoiceOk = Options.includes(choice);

    if (!isChoiceOk) {
      alert('Wrong input - try again');
    }
  }

  return choice;
}

function playRound(playerChoice, computerChoice) {
  const playerIndex = Options.indexOf(playerChoice);
  const computerIndex = Options.indexOf(computerChoice);

  // Player wins if index is always one greater than opponent.
  const losingIndex = (playerIndex + 2) % 3;

  if (playerIndex == computerIndex) {
    return 'You Tie!  Play again'
  }
  else if (computerIndex == losingIndex) {
    return `You Win!  ${playerChoice} beats ${computerChoice}`
  }
  else {
    return `You Lose!  ${computerChoice} beats ${playerChoice}`
  }
}

function updateGame(result) {
  resultDiv.textContent = result;

  if (result.startsWith('You Tie')) {
    if (round == 0) {
      scoreDiv.textContent = '';
    }
    return;
  }

  if (result.startsWith('You Win')) {
    playerScore++;
  }
  else {
    computerScore++;
  }

  round++;

  if (round == numberOfRounds) {
    // End game and reset.
    scoreDiv.textContent = `FINAL SCORE: Player ${playerScore} to Computer ${computerScore}`;
    playerScore = 0;
    computerScore = 0;
    round = 0;
  }
  else {
    scoreDiv.textContent = `Score: Player ${playerScore} to Computer ${computerScore}`;
  }
}
