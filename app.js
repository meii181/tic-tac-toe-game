const playBoard = document.querySelector("#playboard");
const playerTurn = document.querySelector("#gamerChange");
const winner = document.querySelector("#winnerMessage");

// defining the cells the X and O are going to be placed
let startCells = ["", "", "", "", "", "", "", "", ""];

let start = "circle";
playerTurn.textContent = "You can start on any square";
// winner.textContent = "Circle wins!";

// function to create the whole playboard
function createPlayBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addElement);
    playBoard.append(cellElement);
  });
}

createPlayBoard();

function addElement(event) {
  const elementDisplay = document.createElement("div");
  elementDisplay.classList.add(start);
  event.target.append(elementDisplay);
  start = start === "circle" ? "cross" : "circle";
  playerTurn.textContent = "It is " + start + "'s turn!";
  event.target.removeEventListener("click", addElement);
  checkTheScore();
}

function checkTheScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
  ];

  winningCombs.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      winner.textContent = "Circle wins!";
      playerTurn.textContent = "";

      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombs.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      winner.textContent = "Cross wins!";
      playerTurn.textContent = "";

      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}

function resetGame() {
  const button = document.getElementById("restart");
  button.addEventListener("click", location.reload());
}
