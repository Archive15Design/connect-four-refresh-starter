const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    Screen.render();
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  left = () => {
    const nextMove = this.col - 1;
    if (nextMove !== -1){
      this.resetBackgroundColor();
      this.col = nextMove;
      this.setBackgroundColor();
    }

  }

  right = () => {
    const nextMove = this.col + 1;
    if (nextMove < this.numCols){
      this.resetBackgroundColor();
      this.col = nextMove;
      this.setBackgroundColor();
    }
  }

}


module.exports = Cursor;
