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