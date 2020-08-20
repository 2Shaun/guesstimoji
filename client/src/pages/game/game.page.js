import React, { Component, useEffect, useState } from "react";
import queryString from "query-string";
import socket from "../../socketlocal";
import "../../index.css";
import title from "../home/home.page";
import { momBoard, finnBoard } from "../../emojis";
import { connect } from "react-redux";
//import socket from '../../socket';

// This is the VIEW in MVC

// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

// I can send requests with the root room
// the response will go to the game specific room

// I need to figure out how to pass down the values
const GamePage = ({ id, board, player }) => {
  // NumPlayers component which has access to store

  // make sure that you check to see if you can import socket
  // or have to pass it as prop
  console.log(`game board is ${board}, player is ${player} and id is ${id}`);
  // the empty array tells useEffect to only run once

  // state changes in a useEffect could cause an inf loop
  /*
  useEffect(() => {
    if(socket.room !== roomQuery ){
      socket.emit("subscribe", roomQuery);
      console.log(`Subscribed to ${socket.room} in useEffect`);
    }
  });
  */

  // the component will be mounted if the player number is found
  if (player === 0) {
    return <div></div>;
  } else if (player > 2) {
    return (
      <div>
        <p>ROOM IS FULL.</p>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <RoomName room={id} />
          <OpponentBoard room={id} board={board} />
          <Board room={id} board={board} player={player} />
          <Chat room={id} player={player} />
        </div>
      </div>
    );
  }
};
/*
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      values: queryString.parse(window.location.search),
    };
  }

  render() {
  return(
  );
  }
}
*/

const Chat = (props) => {
  const [chat, setChat] = useState([
    {
      username: `Guesstim😎ji:`,
      string: `Click to hide, right-click to copy.`,
    },
  ]);
  const opponent = (props.player % 2) + 1;

  useEffect(() => {
    console.log("test");
  }, []);

  useEffect(() => {
    socket.on("chatMessageReceived", (data) => {
      // the ellipses destructures the array into its discrete elements
      const msg = data.string;
      if (data.player === props.player) {
        setChat([{ username: "You: ", string: msg }, ...chat]);
      } else {
        setChat([{ username: `Player ${opponent}: `, string: msg }, ...chat]);
      }
    });
    socket.on(`gameOver`, (data) => {
      const emoji = data.string;
      if (data.player === props.player) {
        setChat([
          { username: ``, string: emoji + emoji + "YOU WIN" + emoji + emoji },
          ...chat,
        ]);
      } else {
        setChat([
          {
            username: ``,
            string: emoji + emoji + `PLAYER ${opponent} WINS` + emoji + emoji,
          },
          ...chat,
        ]);
      }
    });
  });

  const renderChat = () => {
    // the second argument of map is optional, takes in the index
    // of the element
    // don't use curly brace tuples that don't have tags!!
    return chat.map(({ username: username, string: msg }, i) => (
      <div class={`chatMessage` + i} key={i}>
        <span>{username}</span>
        <span>{msg}</span>
      </div>
    ));
  };

  return (
    <div>
      <ChatButtons player={props.player} room={props.room} />
      <div class="chat-box">{renderChat()}</div>
    </div>
  );
};

const ChatButtons = (props) => {
  // turn [m,n] means it is part n of player m's turn
  // part 1 represents answering yes or no
  // part 2 represents asking a yes/no question (chat available)
  // player 2 asks a question first
  // WAIT TO SET TURN UNTIL MESSAGE FROM SERVER
  // Thinking about [1,0]/[2,0] being player 1/2 needs to select emoji
  const [turn, setTurn] = useState([0, 0]);
  const [msg, setMsg] = useState("");
  const opponent = (props.player % 2) + 1;

  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  useEffect(() => {
    if (opponent == 1) {
      setTurn([1, 2]);
    }
  }, []);
  // setTurn with this
  socket.on(`chatMessageReceived`, (data) => {
    setTurn(data.turn);
  });
  useEffect(() => {
    socket.on(`gameOver`, () => {
      setTurn([3, 3]);
    });
  }, []);

  useEffect(() => {
    if (opponent == 2) {
      socket.on(`player2Joined`, () => {
        setTurn([1, 2]);
      });
    }
  }, []);

  const handleSendClick = () => {
    // it's always part 1 of the other player's turn after a question
    socket.emit("chatMessageSent", {
      player: props.player,
      room: props.room,
      msg: msg,
      turn: [(turn[0] % 2) + 1, 1],
    });
    setMsg("");
  };
  const handleYesClick = () => {
    // it's time for the same player to ask a question after answering yes or no
    socket.emit("chatMessageSent", {
      player: props.player,
      room: props.room,
      msg: "Yes.",
      turn: [turn[0], 2],
    });
  };
  const handleNoClick = () => {
    socket.emit("chatMessageSent", {
      player: props.player,
      room: props.room,
      msg: "No.",
      turn: [turn[0], 2],
    });
  };
  // if send is available as soon as you join
  // the chat room for player 2 will need to be updated when they join
  if (turn[0] === 3 && turn[1] === 3) {
    return <div>GAME OVER</div>;
  } else if (turn[0] === 0 && turn[1] === 0) {
    return <div>Waiting for Player 2 to join...</div>;
  } else if (turn[0] !== props.player) {
    if (turn[1] === 1) {
      return (
        <div>{`Waiting for Player ${opponent} to answer your question...`}</div>
      );
    } else {
      return <div>{`Waiting for Player ${opponent} to ask...`}</div>;
    }
  } else {
    if (turn[1] === 1) {
      return (
        <div>
          <button id="board-select-button" onClick={handleYesClick}>
            YES
          </button>
          <button id="board-select-button" onClick={handleNoClick}>
            NO
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <input
            onChange={(e) => handleChange(e)}
            value={msg}
            placeholder="Ask question or guess"
          />
          <button id="board-select-button" onClick={handleSendClick}>
            SEND
          </button>
        </div>
      );
    }
  }
};

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
const RoomName = (props) => {
  return (
    <div>
      <h3>Room Name: {props.room}</h3>
    </div>
  );
};

// OpponentBoard will listen and update remotely
const OpponentBoard = (props) => {
  //const [freshBoard, setFreshBoard] = useState(easterEgg(props.room));
  const [squares, setSquares] = useState(props.board);

  function easterEgg(room) {
    if (room === "Mom") {
      return momBoard;
    } else if (room === "Finn") {
      return finnBoard;
    } else {
      return props.board;
    }
  }

  // it'll be way easier to have the second player submit the board I think,
  // updating the board the other player has in Game
  socket.on(`setState`, (newSquares) => setSquares(newSquares));
  //socket.on(`setFreshBoard`, (newFreshBoard) => (setFreshBoard(newFreshBoard)));
  var newSquares = squares.slice();

  const renderSquare = (i) => {
    return <OpponentSquare index={i} value={squares[i]} />;
  };
  return (
    <div class="board">
      <div class="board-row">
        {renderSquare(28)}
        {renderSquare(29)}
        {renderSquare(30)}
        {renderSquare(31)}
        {renderSquare(32)}
        {renderSquare(33)}
        {renderSquare(34)}
      </div>
      <div class="board-row">
        {renderSquare(21)}
        {renderSquare(22)}
        {renderSquare(23)}
        {renderSquare(24)}
        {renderSquare(25)}
        {renderSquare(26)}
        {renderSquare(27)}
      </div>
      <div class="board-row">
        {renderSquare(14)}
        {renderSquare(15)}
        {renderSquare(16)}
        {renderSquare(17)}
        {renderSquare(18)}
        {renderSquare(19)}
        {renderSquare(20)}
      </div>
      <div class="board-row">
        {renderSquare(7)}
        {renderSquare(8)}
        {renderSquare(9)}
        {renderSquare(10)}
        {renderSquare(11)}
        {renderSquare(12)}
        {renderSquare(13)}
      </div>
      <div class="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
      </div>
    </div>
  );
};

// Board will emit and update locally
const Board = (props) => {
  //const [freshBoard, setFreshBoard] = useState(easterEgg(props.room));
  const [squares, setSquares] = useState(props.board);
  const [numPlayers, setNumPlayers] = useState(props.player);
  const [chose, setChose] = useState(false);

  function easterEgg(room) {
    if (room === "Mom") {
      return momBoard;
    } else if (room === "Finn") {
      return finnBoard;
    } else {
      return props.board;
    }
  }

  // with 2 boards, there is no reason to listen on the player's board
  //socket.on(`setState`, (newSquares) => (setSquares(newSquares)));
  //socket.on(`setFreshBoard`, (newFreshBoard) => (setFreshBoard(newFreshBoard)));
  var newSquares = squares.slice();
  const handleClick = (i) => {
    // saves typing this.state.
    // can only change board if 2 players in room
    // will need some 'original player' condition if I
    // allow players to spectate
    if (chose === false) {
      socket.emit("newPick", {
        room: props.room,
        player: props.player,
        pick: props.board[i],
      });
      setChose(true);
      return;
    } else if (props.player === 1 || props.player === 2) {
      // this is a white space char, not a space
      // a space causes shifting of rows
      if (squares[i] === "⠀") {
        newSquares[i] = props.board[i];
      } else {
        newSquares[i] = "⠀";
      }
    } else {
      return;
    }
    // sends a request to server to update board on click
    // might make it return something to synchronize events
    // emit to everyone in room but self
    // set square field without server
    socket.emit("newState", { squares: newSquares, room: props.room });
    setSquares(newSquares);
  };

  const handleContextMenu = (i) => {
    navigator.clipboard.writeText(props.board[i]).then(
      () => {
        alert(props.board[i] + " copied! Paste it in the board to guess!");
      },
      () => {
        alert("Couldn't copy emoji. Invalid permissions.");
      }
    );
  };

  const renderSquare = (i) => {
    return (
      <Square
        index={i}
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
        onContextMenu={() => {
          handleContextMenu(i);
        }}
      />
    );
  };
  return (
    <div>
      <div class="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
      </div>
      <div class="board-row">
        {renderSquare(7)}
        {renderSquare(8)}
        {renderSquare(9)}
        {renderSquare(10)}
        {renderSquare(11)}
        {renderSquare(12)}
        {renderSquare(13)}
      </div>
      <div class="board-row">
        {renderSquare(14)}
        {renderSquare(15)}
        {renderSquare(16)}
        {renderSquare(17)}
        {renderSquare(18)}
        {renderSquare(19)}
        {renderSquare(20)}
      </div>
      <div class="board-row">
        {renderSquare(21)}
        {renderSquare(22)}
        {renderSquare(23)}
        {renderSquare(24)}
        {renderSquare(25)}
        {renderSquare(26)}
        {renderSquare(27)}
      </div>
      <div class="board-row">
        {renderSquare(28)}
        {renderSquare(29)}
        {renderSquare(30)}
        {renderSquare(31)}
        {renderSquare(32)}
        {renderSquare(33)}
        {renderSquare(34)}
      </div>
      <div class="board-row">
        <Choice room={props.room} player={props.player} />
      </div>
    </div>
  );
};

// Square
//    props
//      value
//      onClick
function Square(props) {
  // note the use of jsx in onClick attribute and button content
  const [squareVal, setSquareVal] = useState(props.value);
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onContextMenu();
      }}
    >
      {props.value}
    </button>
  );
}

function OpponentSquare(props) {
  // note the use of jsx in onClick attribute and button content
  const [squareVal, setSquareVal] = useState(props.value);
  return <button className="opponent-square">{props.value}</button>;
}

function Choice(props) {
  const [value, setValue] = useState("Select your emoji!");
  socket.on("pickReceived", (data) => {
    setValue("Your emoji: " + data);
  });
  return <button className="choice">{value}</button>;
}

const mapStateToProps = (state) => ({
  id: state.id,
  board: state.board,
  roomFull: state.roomFull,
  playing: state.playing,
});

export default connect(mapStateToProps, null)(GamePage);
