import React, { Component } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

const basicEmojis = ['😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔',
'😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱',
'😲','😳','😵','😷','😸','😹','😺','😻','😼','😽','😾','😿','🙀','🙅','🙆','🙇','🙈','🙉','🙊',
'🙋','🙌','🙍','🙎','🙏'];


// This is the VIEW in MVC

// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

// I can send requests with the root room
// the response will go to the game specific room
const socket = io('http://localhost:4001');

// I need to figure out how to pass down the values
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      values: queryString.parse(window.location.search),
    };
  }
  componentDidMount(){
    const valuesTemp = queryString.parse(this.props.location.search);
    this.setState({values : valuesTemp}) 
  };

  render() {
  return(
    <div className="game">
      <div className="game-board">
        <Board room={this.state.values.room} />
      </div>
    </div>
  );
  }
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
    socket.emit('newState', {squares: squares, room: this.props.room}); 
        
  }

  renderSquare(i){
    // does not change board unless socket
    // receives response from server
    var roomsocket = io.connect();
    roomsocket.emit("subscribe", { room: this.props.room});
    console.log(roomsocket.room);

    roomsocket.on('setState', (data) => {
      console.log(`${data[0]} is the new state.`)
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
