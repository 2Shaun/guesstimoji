import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');

socket.on('message', (data) => {
  console.log(data);
});

const basicEmojis = ['😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔',
'😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱',
'😲','😳','😵','😷','😸','😹','😺','😻','😼','😽','😾','😿','🙀','🙅','🙆','🙇','🙈','🙉','🙊',
'🙋','🙌','🙍','🙎','🙏'];


// This is the VIEW in MVC


// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

function Game() {
  return(
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// there will need to be two boards
// I chose squares to be a state because
// I want the user to modify the board
// Board
//    states
//        squares
// if the onClick function is going to modify squares
// it needs to be in the scope of Board
// thus, it needs to be a prop of square
// this is why I am not making Board a functional component
// TODO : learn why it is bad to define functions
//        inside functional components
class Board extends React.Component {
  // states are defined in the constructor
  constructor(props){
    super(props);
    this.state = {
      squares : basicEmojis,
    };
  }

  // the handleClick function which will be passed down
  // to Square as a prop
  handleClick(i) {
    // saves typing this.state.
    const squares = this.state.squares.slice();
    if(squares[i] === 'X'){
      squares[i] = basicEmojis[i];
    } else {
      squares[i] = 'X';
    }
    // sends a request to server to update board on click
    socket.emit('newState', squares);
  }

  renderSquare(i){
    // does not change board unless socket
    // receives response from server
    socket.on('setState', (data) => {
      this.setState({squares: data});
    });
    return(
      <Square
        value={this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
      />
    );
  }
  render(){
    return(
      <div className="board-row">
        {this.renderSquare(0)}
      </div>
    );
  }

}

// Square
//    props
//      value
//      onClick 
function Square(props) {
  // note the use of jsx in onClick attribute and button content 
  return (
    <button 
      className="square"
      onClick={() => props.onClick()}
      >
        {props.value}
      </button>
  )
}

export default Game;
