const gameloop = (ev) => {
  const playerChoice = ev.target.className;
  const cpuChoice = cpuSelection(); // get a random choice from cpu

  // update choices for both cpu and player
  updateSelection(playerChoice, 'player');
  updateSelection(cpuChoice, 'cpu');

  let result = '';

  // compute outcome of this round
  result = playRound(playerChoice, cpuChoice);
  
  if (result === 'won') {
    playerPoints += 1;
    updateScore(playerPoints, 'player');
  }
  if (result === 'lost') {
    cpuPoints += 1;
    updateScore(cpuPoints, 'cpu');
  }

  // verbose details of current round results
  currentRoundResultsInDetail(playerChoice, cpuChoice, result);

  // if player score reaches 5, stop the game, and show 'Final' before the scoreboard
  // else keep this element hidden
  let s = document.getElementById('final-result');
  if (playerPoints < 5) {
    s.style.display = 'none';
  }
  else {
    s.textContent = 'Final';
    s.style.display = 'inline';
    toggleEventListening(false);
    announceWinner(playerPoints, cpuPoints);
  }
};

const announceWinner = (playerPoints, cpuPoints) => {
  if (playerPoints === cpuPoints) {
    alert('It\'s a DRAW!');
  }
  if (playerPoints > cpuPoints) {
    alert('You WON!!!');
  }
  else {
    alert('You LOST...');
  }
};

const currentRoundResultsInDetail = (playerChoice, cpuChoice, result) => {
  const currentResult = document.getElementById('result');
  
  let newResultContent = '';
  if (result === 'won') {
    newResultContent = `Yay! your ${playerChoice} beats CPU's ${cpuChoice}`;
    currentResult.classList.remove('lost');
    currentResult.classList.add('won');
  }
  else if (result === 'lost') {
    currentResult.classList.add('lost');
    currentResult.classList.remove('won');
    newResultContent = `Lost... CPU's ${cpuChoice} beats your ${playerChoice}`;
  }
  else {
    currentResult.classList.remove('won');
    currentResult.classList.remove('lost');
    newResultContent = `It's a DRAW! Your ${playerChoice} equals CPU's ${cpuChoice}`;
  }

  currentResult.textContent = newResultContent;
};

const updateScore = (score, playerName) => {
  document.querySelector(`.${playerName}-score .score`).textContent = score;
};

const updateSelection = (choice, playerName) => {
  document.querySelector(`.${playerName}-choice .choice`).textContent = choice;
};

const cpuSelection = () => {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randIndex = parseInt(Math.floor(Math.random() * 100) % 3);

  return choices[randIndex];
};

const playRound = (playerChoice, cpuChoice) => {
  let result = '';

  // first evaluate if it's a draw
  if (
    (playerChoice == 'rock' && cpuChoice == 'Rock') ||
    (playerChoice == 'paper' && cpuChoice == 'Paper') ||
    (playerChoice == 'scissors' && cpuChoice == 'Scissors')
  ) {
    result = 'draw';
  }
  // then decide the win situations
  else if (
    (playerChoice == 'scissors' && cpuChoice == 'Paper') ||
    (playerChoice == 'paper' && cpuChoice == 'Rock') ||
    (playerChoice == 'rock' && cpuChoice == 'Scissors')) {
    result = 'won';
  }
  // if it isn't a win or draw, then it's a loss :(
  else {
    result = 'lost';
  }

  return result;
};


const toggleEventListening = (flag) => {
  const buttons = document.querySelectorAll('button');

  if (flag) {
    buttons.forEach((button) => {
      button.addEventListener('click', gameloop);
    });

    return;
  }

  buttons.forEach((button) => {
    button.removeEventListener('click', gameloop);
  });
}

let playerPoints = parseInt(0);
let cpuPoints = parseInt(0);

// initially set both scores to zero
updateScore(0, 'player');
updateScore(0, 'cpu');

toggleEventListening(true);