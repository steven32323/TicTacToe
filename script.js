'use strict';

const restart = document.querySelector('.restart');
// IIFE counter function to increment the round number and keep track of it
let counter = (function () {
  let count = 1;
  return {
    getCount: function () {
      return count;
    },
    increment: function () {
      return count++;
    },
    restart: function () {
      return (count = 1);
    },
  };
})();
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const updateBoard = (i, symbol) => {
  gameBoard[i] = symbol;
  console.log(gameBoard);
  return;
};

const gameController = function () {
  // set players
  //   const player1 = 'X';
  //   const player2 = 'O';
  const square = document.querySelectorAll('.square');
  square.forEach((square, i) => {
    square.addEventListener('click', () => {
      placeSymbol(square, i), roundTracker(), endOfRound();
    });
  });
};

const placeSymbol = function (square, i) {
  let symbol = '';
  if (square.innerHTML === '') {
    if (counter.getCount() % 2 === 1) {
      square.innerHTML = symbol = 'X';
      updateBoard(i, symbol);
      counter.increment();
      //   console.log(square, i, counter.getCount());
      return;
    } else {
      square.innerHTML = symbol = 'O';
      updateBoard(i, symbol);
      counter.increment();
      return;
    }
  } else alert('already taken');
};
gameController();
const roundTracker = function () {
  const playerTracker = document.querySelector('.playerTracker');
  counter.getCount() % 2 === 1
    ? (playerTracker.innerHTML = `Player 1's Turn`)
    : (playerTracker.innerHTML = `Player 2's Turn`);
  console.log(counter.getCount());
};

const endOfRound = function () {
  if (counter.getCount() === 10) gameEnd();
  if (counter.getCount() >= 6) {
    // creates a results array to loop over to check for the winner
    let results = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < results.length; i++) {
      let [a, b, c] = results[i];
      // if there are 3 in a row with empty strings, just return
      if (a === '') return;
      if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
        // sends the winners symbol to the printWinner function
        // console.log(counter.getCount());
        return printWinner(gameBoard[a]);
      }
    }
  }
  return;
};
// if every square is full without a winner, ends the game in a draw
const gameEnd = function () {
  const playerTracker = document.querySelector('.playerTracker');
  playerTracker.innerHTML = `It's a Draw!`;
};

// restarts the game when the restart button is clicked
restart.addEventListener('click', function () {
  const square = document.querySelectorAll('.square');
  const playerTracker = document.querySelector('.playerTracker');
  playerTracker.classList.remove('winner');
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  playerTracker.innerHTML = `Player 1's Turn`;
  square.forEach(square => {
    square.innerHTML = '';
    counter.restart();
  });
});
// Prints the winners details depending on the symbol passed into it
const printWinner = function (symbol) {
  const playerTracker = document.querySelector('.playerTracker');
  const square = document.querySelectorAll('.square');
  square.forEach(square => (square.innerHTML = symbol));
  playerTracker.classList.add('winner');
  playerTracker.innerHTML = `Player ${
    symbol === 'X' ? '1' : '2'
  } is the Winner!`;
};
// loop over each round
// increment round
// repeat until winner
// let counter = (function () {
//   let count = 1;
//   return function () {
//     return count++;
//   };
// })();
// console.log(counter.getCount()); // 1
// console.log(counter()); // 1
// console.log(counter()); // 2
// console.log(counter()); // 3

// 012
// 345
// 678

// 036
// 147
// 258
// 048
// 246
