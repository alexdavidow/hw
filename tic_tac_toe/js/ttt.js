var turn = {
  number: 0,
  current_player_color: function() {
    if (this.number % 2 === 0) {
      return 'red'
    } else {
      return 'blue'
    }
  },
  change_turn: function() {
    this.number += 1;
  },
}
// var game_over = false; 

var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

  function check_rows(){
    for(var index=0; index<3; index++) {
      sum = board[index][0] + board[index][1] + board[index][2]
      console.log(sum)
      if (sum === 3) {
        console.log("player1 win!")        
      }
      if (sum === -3) {
        console.log("player2 win!")
      }
    }
  }
      
  function check_columns(){
    for(c=0;c<3;c++){
      if (board[0][c] + board[1][c] + board[2][c] === 3) {
        console.log("player1 win!")        
      }
      if (board[0][c] + board[1][c] + board[2][c] === -3) {
        console.log("player2 win!")
      }
    }
  }    

  function check_diags(){

      if (board[0][0] + board[1][1] + board[2][2]=== 3){
        alert("you win!")
      }
      if (board[0][0] + board[1][1] + board[2][2]=== -3){
        alert("you win!")
      }
      if (board[0][2] + board[1][1] + board[2][0]=== 3){
        alert("you win!")
      }
      if (board[0][2] + board[1][1] + board[2][0]=== -3){
        alert("you win!")
      }
  }

  function check_draw(){
    if (turn > 9 && !game_finished){
      draw_game();
    }
  }
  function win_game(){
    alert('You win!')
    $('#reset').show();
  }

  function reset_game(){
    new_game = prompt('Do you want to play again?')
    if(new_game){   
    turn = 1;
    game_state = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ];
    }
  }

  function win_check(){
    check_rows();
   check_columns();
   check_diags();
   check_draw()
  }


  // var context_id,
  //     row_num,
  //     col_num;


  $(document).ready(function() {
    $('.box_cell').click(function() {
      $(this).css('background-color', turn.current_player_color());

      var current_row = $(this).data('row')
      var current_col = $(this).data('col')
      if (turn.number % 2 === 0) {
        board[current_row][current_col] = 1
      } else {
        board[current_row][current_col] = -1
      }

      turn.change_turn()
      win_check()


    })
  })