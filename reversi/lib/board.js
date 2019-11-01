let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [];
  for (y = 0; y < 8; y++) {
    let row = [];
    for (x = 0; x < 8; x++) {
      row.push(undefined);
    }
    grid.push(row);
  }
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

Board.prototype.outOfBounds = function (x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return true;
  }
  return false;
}

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (this.outOfBounds(x, y)) {
    throw new Error('Not valid pos!');
  }
  return this.grid[x][y];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  if (this.validMoves(color).length === 0) {
    return false;
  }
  return true;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.grid[pos[0]][pos[1]];
  if (piece === undefined) {
    return false;
  } else {
    return (piece.color === color ? true : false);
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return (this.grid[pos[0]][pos[1]] === undefined) ? false : true;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return (this.hasMove('white') === false &&
  this.hasMove('black') === false);
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return false;
  }
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!board.isValidPos(newPos)) {
    return null;
  }
  let piece = board.getPiece(newPos);
  if (piece === undefined) {
    return null;
  }
  if (piece.color === color) {
    if (piecesToFlip.length === 0) {
      return null;
    }
    return piecesToFlip;
  }
  piecesToFlip.push(piece);
  return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
}

function _allPositionsToFlip(board, pos, color) {
  let allFlip = [];
  Board.DIRS.forEach(el => {
    allFlip = allFlip.concat(_positionsToFlip(board, pos, color, el, []));
  });
  return allFlip.filter(el => {
    return el !== null;
  });
}

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  let arr = this.grid.map(row => {
    return row.map(el => {
      return el === undefined ? '_' : el.toString();
    });
  });
  arr.forEach(pieces => {
    console.log(pieces.join(' '));
  })
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if ((!this.isOccupied(pos)) && _allPositionsToFlip(this, pos, color).length > 0) {
    return true;
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let moves = [];
    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        let move = [x, y];
        if (this.validMove(move, color)) {
          moves.push(move);
        }
      }
    }
  return moves;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let valid = this.validMoves(color).map(el => {
    return el.toString();
  });
  if (valid.includes(pos.toString())) {
    this.grid[pos[0]][pos[1]] = new Piece(color);
    let k = _allPositionsToFlip(this, pos, color);
    _allPositionsToFlip(this, pos, color).forEach(piece => {
      piece.flip();
    });
  } else {
    throw new Error('Invalid Move');
  }
};

module.exports = Board;
