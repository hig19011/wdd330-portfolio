
class Board {
  currentPlayer = 1;
  gameOver = false;

  constructor() {
    var resetButton = document.getElementById('resetButton');
    resetButton.addEventListener("click",this.reset);

    var board = document.getElementById('board');
    var cells = Array.from(board.children);
    cells.forEach(element => {
      element.addEventListener("click",this.markCell);
    });

    this.reset();    
    this.setPlayersTurn();
  };

  setPlayersTurn = () => {
    var playerNumber = document.getElementById("playerNumber");
    playerNumber.innerText = this.currentPlayer;
  }

  markCell = e => {
    if(this.gameOver)
      return;

    var mark = "";
    if(this.currentPlayer == 1) {
        mark="X";       
    }
    else {
      mark="O";      
    }
   
    e.currentTarget.innerText = mark;
    
    var isWin = this.isWin();
    if(isWin){
      setTimeout(function() {
        alert("Winner");
      }, 200);
      
      this.gameOver = true;
      return;
    }
    if(this.isTie()){
      setTimeout(function() {
        alert("Tie");
      }, 200);
      this.gameOver = true;
      return;
    }

    if(this.currentPlayer == 1) {
      this.currentPlayer = 2
    }
    else {
      this.currentPlayer = 1
    }
    this.setPlayersTurn();
  };

  reset = () => {    
    var board = document.getElementById('board');
    var cells = Array.from(board.children);
    cells.forEach(element => {
      element.innerText = "";
    });

    this.currentPlayer = 1;
    this.setPlayersTurn();
    this.gameOver = false;
  }

  isWin = () => {
    var board = document.getElementById('board');
    var cells = Array.from(board.children);
    if(cells[0].innerText == cells[1].innerText && cells[0].innerText == cells[2].innerText && cells[0].innerText !=""){
      return true;
    }
    if(cells[3].innerText == cells[4].innerText && cells[3].innerText == cells[5].innerText && cells[3].innerText !=""){
      return true;
    }
    if(cells[6].innerText == cells[7].innerText && cells[6].innerText == cells[8].innerText && cells[6].innerText !=""){
      return true;
    }

    if(cells[0].innerText == cells[3].innerText && cells[0].innerText == cells[6].innerText && cells[0].innerText !=""){
      return true;
    }
    if(cells[1].innerText == cells[4].innerText && cells[1].innerText == cells[7].innerText && cells[1].innerText !=""){
      return true;
    }
    if(cells[2].innerText == cells[5].innerText && cells[2].innerText == cells[8].innerText && cells[2].innerText !=""){
      return true;
    }

    if(cells[0].innerText == cells[4].innerText && cells[0].innerText == cells[8].innerText && cells[0].innerText !=""){
      return true;
    }
    if(cells[6].innerText == cells[4].innerText && cells[6].innerText == cells[2].innerText && cells[6].innerText !=""){
      return true;
    }    
    return false;
  }

  isTie = () => {
    if(this.isWin())
      return false;
    
    let board = document.getElementById('board');
    let cells = Array.from(board.children);
    let isTie = true;

    cells.forEach( cell => {
      if(cell.innerText == "") {
        isTie = false;
      }       
    });

    return isTie;
  }

}

let board = new Board();