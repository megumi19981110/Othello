SQUARE_STATUS_IS_OWNED="01";
SQUARE_STATUS_IS_OTHER="02";
SQUARE_STATUS_NOT_SELECTED="09";

let isOddTurn = true;

$(function () {
  $(".square").click(clickSquareEvent);
  initializeEvent();
});

function clickSquareEvent() {
  let square = $(this);
  
  if(!canSelect(square)) {
    return;
  }

  changeOwner(square);
}

 function initializeEvent() {
  changeOwner(getTargetSquare(3, 3));
  changeOwner(getTargetSquare(3, 4));
  changeOwner(getTargetSquare(4, 4));
  changeOwner(getTargetSquare(4, 3));
}

 function changeOwner(square) {
  putPiece(square, getTurnString());
  changeOwnerOpposite(square);
  changeTurn();
}

function putPiece(targetSquare, owner) {
  targetSquare.text("●").attr("data-owner", owner).addClass("selected");
}

function getTurnString() {
  if (isOddTurn) {
    return "black";
  }
  return "white";
}

function changeTurn() {
  isOddTurn = !isOddTurn;
}

function getTargetSquare(row, col) {
  return $("[data-row=" + row + "][data-col=" + col + "]");
}

function canSelect(square) {
  if (square.hasClass("selected")) {
    return false;
  }
  return true;
}

function changeOwnerOpposite(square) {
    let row = square.data("row");
    let col = square.data("col");
  
    changeOwnerOppositeLower(row, col); // 下
  }

  function changeOwnerOppositeLower(row, col) {
    let endPos = getPosOppositeLower(row, col);
    if (endPos == null) {
      return;
    }
  
    let targetCol = col;
    for (targetRow = row + 1; targetRow < endPos.row; targetRow++) {
      let targetSquare = getTargetSquare(targetRow, targetCol);
      putPiece(targetSquare, getTurnString());
    }
  }
  
  function getPosOppositeLower(row, col) {
    if (row == 7) {
      return null;
    }

    let targetRow = row + 1;
    let targetCol = col;
    if (getSquareStatus(targetRow, targetCol) != SQUARE_STATUS_IS_OTHER) {
      return null;
    }

    for (targetRow++; targetRow <= 7; targetRow++) {
      let status = getSquareStatus(targetRow, targetCol);
  
      if (status == SQUARE_STATUS_NOT_SELECTED) {
        return null;
      }

      if (status == SQUARE_STATUS_IS_OWNED) {
        return {
          row: targetRow,
          col: targetCol,
        };
      }
    }
    return null;
  }
  
  function getSquareStatus(row, col) {
    let targetSquare = getTargetSquare(row, col);
  
    if (!targetSquare.hasClass("selected")) {
      return SQUARE_STATUS_NOT_SELECTED;
    }
  
    if (getTurnString() == targetSquare.attr("data-owner")) {
      return SQUARE_STATUS_IS_OWNED;
    }

    return SQUARE_STATUS_IS_OTHER;
  }