import React, { Component, useEffect, useState } from "react";
import RoomName from "./RoomName";
import OpponentBoard from "./OpponentBoard";
import Board from "./Board";
import Chat from "./Chat";
import queryString from "query-string";
import socket from "../../socketlocal";
import "../../index.css";
import title from "../home/home.page";
import { connect, useDispatch } from "react-redux";
import { newMessage } from "../../redux/actions";
//import socket from '../../socket';

// This is the VIEW in MVC

// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

// I can send requests with the root room
// the response will go to the game specific room

// I need to figure out how to pass down the values
const GamePage = ({ socket, id, board, player }) => {
  console.log("GamePage -> player", player);
  console.log("GamePage -> board", board);
  console.log("GamePage -> id", id);
  console.log("GamePage -> socket", socket);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on(`gameOver`, (data) => {
      const emoji = data.string;
      if (data.player === player) {
        dispatch(
          newMessage({
            username: ``,
            message: emoji + emoji + "YOU WIN" + emoji + emoji,
          })
        );
      } else {
        dispatch(
          newMessage({
            username: ``,
            message: emoji + emoji + `PLAYER ${opponent} WINS` + emoji + emoji,
          })
        );
      }
    });
    socket.on("chatMessageReceived", (data) => {
      // the ellipses destructures the array into its discrete elements
      const msg = data.string;
      if (data.player === player) {
        setChat([{ username: "You: ", msg: msg }, ...chat]);
      } else {
        setChat([{ username: `Player ${opponent}: `, msg: msg }, ...chat]);
      }
    });
  }, [player]);
  // NumPlayers component which has access to store

  // make sure that you check to see if you can import socket
  // or have to pass it as prop
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
  return (
    <div>
      <div>
        <RoomName room={id} />
        <OpponentBoard board={board} socket={socket} room={id} />
        <Board socket={socket} room={id} player={player} />
        <Chat socket={socket} room={id} player={player} />
      </div>
    </div>
  );
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

// OpponentBoard will listen and update remotely

// Board will emit and update locally

// Square
//    props
//      value
//      onClick

const mapStateToProps = (state) => ({
  id: state.id,
  board: state.board,
  roomFull: state.roomFull,
  playing: state.playing,
  player: state.player,
});

export default connect(mapStateToProps, null)(GamePage);
