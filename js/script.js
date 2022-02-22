let main = () => {
  let i = parseInt(0);
  let playerPoints = parseInt(0);
  let cpuPoints = parseInt(0);
  let result = '';

  while (i < 5) {
    result = toString(game(i + 1));
    if (result === 'won') playerPoints += 1;
    if (result === 'lost') cpuPoints += 1;

    console.log(`ROUND ${i + 1}: Player: ${playerPoints}, CPU: ${cpuPoints}`);
    i += 1;
  }
};

let game = (roundNumber) => {
  let cpuChoice = cpuSelection(roundNumber);
  let playerChoice = playerSelection(roundNumber);

  let result = playRound(playerChoice, cpuChoice);

  console.log(`Round ${roundNumber}: ${result}`);
  alert(result);

};

let cpuSelection = (roundNumber) => {
  let choices = ['Rock', 'Paper', 'Scissors'];

  let choiceIndex = parseInt(Math.floor(Math.random() * 100) % 3);

  console.log(`ROUND ${roundNumber}: CPU chose ${choices[choiceIndex]}`);
  return choices[choiceIndex];
};

let playerSelection = (roundNumber) => {
  let playerChoice = prompt(`ROUND ${roundNumber}: Rock, Paper or Scissors?: `);
  console.log(`USER: ${playerChoice}`);
  return playerChoice;
};

let playRound = (playerChoice, cpuChoice) => {
  let result = '';

  // first evaluate if it's a draw
  if (
    ((playerChoice == 'Rock' || playerChoice == 'rock' || playerChoice == 'ROCK') && cpuChoice == 'Rock') ||
    ((playerChoice == 'Paper' || playerChoice == 'paper' || playerChoice == 'PAPER') && cpuChoice == 'Paper') ||
    ((playerChoice == 'Scissors' || playerChoice == 'scissors' || playerChoice == 'SCISSORS') && cpuChoice == 'Scissors')
  ) {
    result = 'draw';
  }
  // then decide the win situations
  else if (
    ((playerChoice == 'Scissors' || playerChoice == 'scissors' || playerChoice == 'SCISSORS') && cpuChoice == 'Paper') ||
    ((playerChoice == 'Paper' || playerChoice == 'paper' || playerChoice == 'PAPER') && cpuChoice == 'Rock') ||
    ((playerChoice == 'Rock' || playerChoice == 'rock' || playerChoice == 'ROCK') && cpuChoice == 'Scissors')) {
    result = 'won';
  }
  // if it isn't a win or draw, then it's a loss :(
  else {
    result = 'lost';
  }

  return result;
};

main();
