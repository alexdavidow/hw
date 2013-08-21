var turn = 1;
var board = [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]
              ];
var context_id,
    row_num,
    col_num;

// var game_over = false;            

//   function check_rows(){
//     if game_over === false;
//     var length = tic_tac_toe_array.length
//     for(r=0;r<length;r++)
//       if (tic_tac_toe_array[r][0] + tic_tac_toe_array[r][1] + tic_tac_toe_array[r][2] === 3) {
//         alert("you win!")
//       }
//       if (tic_tac_toe_array[r][0] + tic_tac_toe_array[r][1] + tic_tac_toe_array[r][2] === -3) {
//         alert("you win!")
//       }
//     }
      
//   function check_columns(){
//     if game_over === false;
//     var length = tic_tac_toe_array.length
//     for(c=0;c<length;c++)
//       if (tic_tac_toe_array[0][c] + tic_tac_toe_array[1][c] + tic_tac_toe_array[2][c] === 3) {
//         alert("you win!")
//       }
//       if (tic_tac_toe_array[0][c] + tic_tac_toe_array[1][c] + tic_tac_toe_array[2][c] === -3) {
//         alert("you win!")
//       }
//     }  

//   function check_diags(){
//     if game_over === false;
//       if (tic_tac_toe_array[0][0] + tic_tac_toe_array[1][1] + tic_tac_toe_array[2][2]=== 3){
//         alert("you win!")
//       }
//       if (tic_tac_toe_array[0][0] + tic_tac_toe_array[1][1] + tic_tac_toe_array[2][2]=== -3){
//         alert("you win!")
//       }
//       if (tic_tac_toe_array[0][2] + tic_tac_toe_array[1][1] + tic_tac_toe_array[2][0]=== 3){
//         alert("you win!")
//       }
//       if (tic_tac_toe_array[0][2] + tic_tac_toe_array[1][1] + tic_tac_toe_array[2][0]=== -3){
//         alert("you win!")
//       }
//   }

//   function win_check(){
//     check_rows();
//     check_columns();
//     check_diags()
//   }

//   if alert("you win!") {
//     game_over === true;
//   }

  function change_turn(){
    if (turn % 2 === 0) {
      tic_tac_toe_array[row_num][col_num] = 1;
      } else {
      tic_tac_toe_array[row_num][col_num] = -1;
    }
      turn++;
      // win_check();  
  }
  // function selection() {
  //   var ex_input = $('section data-row data-col').text("x")
  //   var oh_input = $('section data-row data-col').text("o")
  // }

  // function box_taken(context.data-row, context.data-col) {
  //   data-row = +data-row+ " "
  //   data-col = +data-col+ " "
  // }

$(document).ready(
  function(){
    $('.mark_box').click( 
      function(){
        context_id = this.id
        row_num = parseInt(context_id.slice(7, 8));
        col_num = parseInt(context_id.slice(9, 10));
        // console.log(context_id)
        // console.log(row_num)
        // console.log(col_num)
        change_turn()
        // $('#input_'+row_num+'_'+col_num)
      }
    )
  }
)
