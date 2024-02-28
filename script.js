const Options = ["Rock", "Paper", "Scissors"];

const resultDiv = document.createElement('div');

Options.forEach((option) => {
  const button = document.createElement('button');
  button.textContent = option;

  button.addEventListener('click', (e) => {
    const playerChoice = e.target.textContent;
    const computerChoice = getComputerChoice();

    const result = playRound(playerChoice, computerChoice);

    resultDiv.textContent = result;
  });

  document.body.appendChild(button);
});

document.body.appendChild(resultDiv);

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
  let choice = "";

  while (!isChoiceOk) {
    let input = prompt("Choose Rock, Paper, or Scissors");
    choice = toChoice(input);

    isChoiceOk = Options.includes(choice);

    if (!isChoiceOk) {
      alert("Wrong input - try again");
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
    return "You Tie! Play again"
  }
  else if (computerIndex == losingIndex) {
    return `You Win! ${playerChoice} beats ${computerChoice}`
  }
  else {
    return `You Lose! ${computerChoice} beats ${playerChoice}`
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  const numberOfRounds = 5;

  let round = 0;
  while (round < numberOfRounds) {
    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();

    result = playRound(playerChoice, computerChoice);

    console.log(result);

    if (result.startsWith("You Tie")) {
      continue;
    }

    if (result.startsWith("You Win")) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    round++;
  }

  console.log(`Final Score: Player ${playerScore} to Computer ${computerScore}`);
}

// game();