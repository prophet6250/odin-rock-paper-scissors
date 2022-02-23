let main = () => {
  let i = parseInt(0);
  let playerPoints = parseInt(0);
  let cpuPoints = parseInt(0);
  let result = '';

  while (i < 5) {
    result = game();
    if (result === 'won') playerPoints += 1;
    if (result === 'lost') cpuPoints += 1;

    i += 1;
  }
  alert(`main():\n\nWon: ${playerPoints}\nLost: ${cpuPoints}\nDraws: ${5 - playerPoints - cpuPoints}`);
};

let game = () => {
  let cpuChoice = cpuSelection();
  let playerChoice = playerSelection();

  let result = playRound(playerChoice, cpuChoice);

  if (result == 'won') {
    alert(`game():\n\nyou WON!\nyour ${playerChoice} beats CPU's ${cpuChoice}!`)
  }
  else if (result == 'lost') {
    alert(`game():\n\nyou LOST...\nCPU's ${cpuChoice} beats your ${playerChoice}!`)
  }
  else {
    alert(`game():\n\nit's a DRAW!\nyour ${playerChoice} equals CPU's ${cpuChoice}!`)
  }

  return result.toString();
};

let cpuSelection = () => {
  let choices = ['Rock', 'Paper', 'Scissors'];

  let choiceIndex = parseInt(Math.floor(Math.random() * 100) % 3);

  console.log(`cpuSelection():\n\nCPU chose ${choices[choiceIndex]}`);
  return choices[choiceIndex];
};

let playerSelection = () => {
  let playerChoice = prompt(`playerSelection():\n\nRock, Paper or Scissors? `);
  console.log(`playerSelection():\n\nPlayer chose ${playerChoice}`);
  return playerChoice;
};

let playRound = (playerChoice, cpuChoice) => {
  let result = 'error';

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

  console.log(`playRound():\n\n${result}`);

  return result;
};

main();
