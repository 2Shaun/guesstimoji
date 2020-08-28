import React, { Component, useEffect, useState } from "react";
import RoomName from "./RoomName";
import OpponentBoard from "./OpponentBoard";
import Board from "./Board";
import GameLog from "./GameLog";
import queryString from "query-string";
import socket from "../socketlocal";
import "../index.css";
import { connect, useDispatch } from "react-redux";
import { turnSubmitted, cleared } from "../redux/gameLogSlice";
import { clicked } from "../redux/opponentBoardSlice";
//import socket from '../../socket';

// This is the VIEW in MVC

// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

// I can send requests with the root room
// the response will go to the game specific room

// I need to figure out how to pass down the values
const GamePage = ({
  socket,
  roomID,
  roomFull,
  board,
  player,
  gameCount,
  winner,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (roomFull) {
      socket.on("server:gameLog/turnSubmitted", (turnData) => {
        dispatch(turnSubmitted(turnData));
      });
      socket.on("server:opponentBoard/clicked", (index) => {
        dispatch(clicked(index));
      });
    } else {
      socket.off("server:gameLog/turnSubmitted");
      socket.off("server:opponentBoard/clicked");
    }
  }, [roomFull]);
  useEffect(() => {
    socket.on("server:gameLog/cleared", () => {
      dispatch(cleared());
    });
  }, []);

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
        <RoomName roomID={roomID} />
        <OpponentBoard board={board} socket={socket} roomID={roomID} />
        <Board board={board} socket={socket} roomID={roomID} player={player} />
        <GameLog
          socket={socket}
          roomID={roomID}
          roomFull={roomFull}
          player={player}
          winner={winner}
        />
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
  ...state.room,
});

const mapDispatchToProps = {
  turnSubmitted,
  cleared,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
