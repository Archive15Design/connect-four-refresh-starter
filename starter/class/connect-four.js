const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('left', 'move cursor left', this.cursor.left);
    Screen.addCommand('right', 'move cursor right', this.cursor.right);
    Screen.addCommand('space', 'place symbol at cursor', this.place);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

   place = () => {
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

    if (this.playerTurn === 'X'){
      this.playerTurn = 'O'
    } else {
      this.playerTurn = 'X'
    }

    let winner = this.checkWin();
    if (winner === false){
      Screen.setMessage(`Current player is: ${this.playerTurn}`);
    } else {
      ConnectFour.endGame(winner);
    }
  }

  checkWin(grid) {
    const flatGrid = this.grid.flat();
    if (flatGrid.every(ele => ele === ' ')){
      return false;
    }

    let winner = null;
    let boardHasNoSpace = true;

    for (let row = 0; row < grid.length; row++){
      const currentRow = grid[row];
      //check for space on board
      if (boardHasNoSpace){
        boardHasNoSpace = checkForSpace(currentRow);
      }

      // counter for consecutive cells
      let horizontalCount = 0;

      for (let col = 0; col < currentRow.length; col++){
        let currentCell = currentRow[col];


        // check if current cell is the same as previous cell
        let previousCell = currentRow[col - 1];
        if (checkHorizontal(currentCell, previousCell)){
          horizontalCount++
          // check if 4 cells have been consecutive
            if (horizontalCount === 3){
              winner = currentRow[col];
            }
        } else{
          horizontalCount = 0;
        }

        //check for diagonal wins
        let diagonalDownwardCount = 0;
        diagonalDownwardCount = checkDiagonalDownward(grid, row + 1, col + 1, currentCell, diagonalDownwardCount);
        if (diagonalDownwardCount === 3){
          winner = currentCell;
        }

        let diagonalUpwardCount = 0;
        diagonalUpwardCount = checkDiagonalUpward(grid, row + 1, col - 1, currentCell, diagonalUpwardCount);
        if (diagonalUpwardCount === 3){
          winner = currentCell;
        }

        //check vertical wins
          let verticalCount = 0;
          verticalCount = checkVertical(grid, row, col, verticalCount);
          if (verticalCount === 3){
            winner = currentCell;
          }

      }
    }

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    if (winner !== null){
      return winner;
    } else if (boardHasNoSpace){
      return 'T';
    } else {
      return false;
    }

    function checkForSpace(row){
      if (row.some(ele => ele === ' ')){
        return false;
      }
      return true;
    }

    function checkHorizontal(currentCell, previousCell){
      if (currentCell === previousCell && 'XO'.includes(currentCell)){
        return true;
      }
      return false;
    }

    function checkDiagonalDownward(grid, row, col, previousCell, counter){
      let currentCell;
      if (row < grid.length && col < grid[row].length){
        currentCell = grid[row][col];
      } else{
        return counter;
      }

      if (currentCell === previousCell && 'XO'.includes(currentCell)){
        counter++;
        previousCell = currentCell;

        return checkDiagonalDownward(grid, row + 1, col + 1, previousCell, counter);
      } else {
        return counter;
      }
    }

    function checkDiagonalUpward(grid, row, col, previousCell, counter){
      let currentCell;
      if (row < grid.length && col >= 0){
        currentCell = grid[row][col];
      } else{
        return counter;
      }

      if (currentCell === previousCell && 'XO'.includes(currentCell)){
        counter++;
        previousCell = currentCell;

        return checkDiagonalUpward(grid, row + 1, col - 1, previousCell, counter);
      } else {
        return counter;
      }
    }

    function checkVertical(grid, row, col, counter){

      const currentCell = grid[row][col];
      let cellBelow;

      if (row === grid.length - 1){
        return counter;
      } else {
        cellBelow = grid[row + 1][col];
      }

      if (currentCell === cellBelow && 'XO'.includes(currentCell)){
        counter++;
        return checkVertical(grid, row + 1, col, counter);
      }
      else {
        return counter;
      }
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

// LOCAL TESTS

module.exports = ConnectFour;
