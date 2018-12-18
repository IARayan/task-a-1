import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {

 startDate=new Date().getTime();
 statistic={
   player:{win:0,loss:0,draw:0},
   cpu:{win:0,loss:0,draw:0},
   time:"0"
 };
 endDate=new Date().getTime();

  PLAYER_COMPUTER = { name: 'Computer', symbol: 'o' };
  PLAYER_A = { name: 'You', symbol: 'x' };
  DRAW = { name: 'Draw' };

  board: any[];
  currentPlayer = this.PLAYER_A;
  lastWinner: any;
  gameOver: boolean;
  gameLocked: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  square_click(square) {
    if(square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_A.symbol;
      this.completeMove(this.PLAYER_A);
    }
  }

  computerMove(firstMove: boolean = false) {
    this.gameLocked = true;

    setTimeout(() => {
      let square = firstMove ? this.board[4] : this.getRandomAvailableSquare();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.gameLocked = false;
    }, 600);
  }
calculateTime(){
  this.endDate=new Date().getTime();

  var msg = this.timeInMinAndSec(this.endDate-this.startDate);
  this.statistic.time=msg;
  console.log(this.statistic);
}
  completeMove(player) {
    if(this.isWinner(player.symbol))
     { this.showGameOver(player);
    console.log(player)
    if(player.symbol=="o"){
      this.statistic.cpu.win++;
      this.statistic.player.loss++;
     this.calculateTime();
    }
    if(player.symbol=="x"){
      this.statistic.player.win++;
      this.statistic.cpu.loss++;
      this.calculateTime();

    }
    }
    else if(!this.availableSquaresExist())
{      this.showGameOver(this.DRAW);
  console.log(this.statistic);
  this.statistic.player.draw++;
  this.statistic.cpu.draw++;
  this.calculateTime();


}    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_COMPUTER ? this.PLAYER_A : this.PLAYER_COMPUTER);

      if(this.currentPlayer == this.PLAYER_COMPUTER)
        this.computerMove();
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  getRandomAvailableSquare(): any {
    let availableSquares = this.board.filter(s => s.value === '');
    var squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if(winner !== this.DRAW)
      this.currentPlayer = winner;  
  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top winner row
      [3, 4, 5],  //middle winner row
      [6, 7, 8],  //bottom winner row
      [0, 3, 6],  //first winner col
      [1, 4, 7],  //second winner col
      [2, 5, 8],  //third winner col
      [0, 4, 8],  //first winner diagonal
      [2, 4, 6]   //second winner diagonal
    ];
  }

  isWinner(symbol): boolean {
    for(let pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if(foundWinner) {
        for(let index of pattern) {
          this.board[index].winner = true;
        }

        return true;
      }
    }

    return false;
  }

  newGame() {
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];

    this.gameOver = false;
    this.gameLocked = false;

    if(this.currentPlayer == this.PLAYER_COMPUTER){
      this.gameLocked = true;
      this.computerMove(true);
    }


  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  timeInMinAndSec(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds:any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

}
