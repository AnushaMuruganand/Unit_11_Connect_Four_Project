/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/********* Event handler to display the game when "start" button is clicked */
const startDiv = document.getElementById("start");
const startBtn = document.getElementById("start-game-btn");
const player1 = document.getElementById("p1");
const player2 = document.getElementById("p2");
const gameDiv = document.getElementById("game");

startBtn.addEventListener("click", function () {
  if (player1.value === "" || player2.value === "") {
    alert("Please enter the Player Details!!!");
    return;
  }
  startDiv.classList.add("playing");
  gameDiv.classList.add("startGame");
});

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])(y=Height(6) and x=Width(7))
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // This allows us to create an empty grid of 6 * 7 i.e we are initializing the grid before we start the game, where all the cells are initialized to "null"
   board = [...Array(HEIGHT).fill(null)].map(e => Array(WIDTH).fill(null));
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector("#board");
 
   // TODO: add comment for this code
   // This code block is used to create 7 rows where we click to drop the chips
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
   // Creating a grid of 7 wide by 6 height
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /******** findSpotForCol: given column x, return top empty y (null if filled) */
 
function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let y = HEIGHT - 1; y >= 0; y--)
   {
     if (board[y][x] === null) {
       return y;
     }
   }
   return null;
 }
 
 /******* placeInTable: update DOM to place piece into HTML table of board */
 
 // This function is called from "handleClick()"
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const divPiece = document.createElement("div");

  // Selecting the correct table cell we clicked based on "y" and "x"
  const correctTableCell = document.getElementById(`${y}-${x}`);

  divPiece.classList.add("piece");
  divPiece.classList.add(`p${currPlayer}`);
  correctTableCell.append(divPiece);

 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   const gameOverDiv = document.getElementById('end');
   gameOverDiv.classList.add("gameOver");
   let msgHeader = end.children[0];
   msgHeader.innerText = msg;
 }
 
 /********* handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell and convert it to a number
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);

   // Updating the "board" array with the players as "p1" or "p2" based on curPlayer
   board[y][x] = `p${currPlayer}`;
 
   // check for win
   if (checkForWin()) {
     const player = `p${currPlayer}` === player1.id ? player1.value[0].toUpperCase() + player1.value.slice(1) : player2.value[0].toUpperCase() + player2.value.slice(1);
     return endGame(`${player} WON the Game \n HURRAY!!!!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame

   // Checking if every cell in the "board" array is filled
   // We use 2 "every()" since "every()" does NOT work on "nested arrays" in JS
   let boardTieOrNot = board.every((row) => row.every((cell) => cell !== null));
   if (boardTieOrNot) {
     return endGame("Game TIED!!! Try Again!!");
   }
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
     // Checks whether they are within the width and height and also checks if four cells are of same player.
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === `p${currPlayer}`
     );
    };
 
   // TODO: read and understand this code. Add comments to help you.
 
  // Looping over the entire board to check whether there are four consecutive same players either vertically or horizontally or diagonnaly left or diagonnal right
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
      
       // "horiz" checks four consecutive cells horizontally each time we enter this loop with current y and x value
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];

       // "vert" checks four consecutive cells vertically each time we enter this loop with current y and x value
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];

       // "diagDR" checks four consecutive cells diagonally towards the right each time we enter this loop with current y and x value
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

       // "diagDL" checks four consecutive cells diagonally towards the left each time we enter this loop with current y and x value
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
      // Here the "_win()" function is called by passing "horiz" or "vert" or "diagDR" or "diagDL" to see if all the four sub-array value inside of ""horiz" or "vert" or "diagDR" or "diagDL"" are of same player and they are within the "HEIGHT" and "WIDTH" values.
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 