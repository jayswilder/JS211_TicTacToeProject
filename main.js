'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];


// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  for (let i = 0; i < 3; i++) {
    if (board[i][0]==board[i][1]&& board[i][0]==board[i][2]){
    if (board[i][0] == 'X' || board[i][0] == 'O'){
        return true;
      }
    }  
  }
  return false;
}

const verticalWin = () => {
  // Your code here to check for vertical wins
  for (let i = 0; i < 3; i++)
  { if (board[0][i] == board[1][i]&& board[0][i] == board[2][i]){
    if(board[0][i] == 'X' || board[0][i] == 'O'){
        return true;
      }
    }
  }
  return false;
};

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if(board[0][0] =='X' || board[0][0] =='O') {
    return true;
    }
  };
  
  if (board[0][2] === board[1][1] && board[2][0]) {
    if(board[0][2] =='X' || board[0][2] =='O') {
    return true;
    }
  } else {
    return false;
  }
}

const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if (horizontalWin()){
    return true;
  }
    if (diagonalWin()) {
    return true;
    }
  if (verticalWin()){
      return true;
    } else {
    return false;
  }
}

const changeMarker = () => {
  // ternary operator: if it's an X make it an O, if O make it an X
  playerTurn = playerTurn === "X" ? "O" : "X"
}

const validInput = (row, column) => {
  if (row > 2 || column > 2) {
    console.log(" ");
    console.log("Invalid Input! Please enter '0', '1', or '2'!");
    console.log(" ");
  } else {
    return true;
  }
}
const resetBoard = () => {
  if (checkForWin()) {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  }
};

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board
  // then check for a win
  if (validInput(row, column)) {
  board[row][column] = playerTurn;
  
  if (checkForWin()) {
    console.log(" ");
    console.log(`Winner! ${playerTurn}`);
    console.log(" ")

    resetBoard();

    console.log("New game started!");
    console.log(" ");

  } else {
  changeMarker();
  }
}
};

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
