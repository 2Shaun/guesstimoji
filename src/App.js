import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import socket from "./socket";
import socket from "./socketlocal";
import HomePage from "./home.page";
import GamePage from "./game/game.page";
import Footer from "./footer";
import "./index.css";
import { connect } from "react-redux";
import { homePageLoaded, roomJoined } from "./redux/roomSlice";
import { getBoards, getEmojis, addGetEmojiResponseAsBoard, graphQlPost } from "./apiUtils";
import { gotBoards } from "./redux/boardsSlice";
// view layer


// handleJoin data should have both id and board selection

// the first argument to a component is always the props obj
const App = ({ roomJoined, homePageLoaded, gotBoards, roomID, player }) => {
  useEffect(() => {
    getBoards('{getBoards{emojis}}')
      .then((res) => res.map(x => x.emojis))
      .then((boards) => { console.log("gotBoards"); gotBoards(boards); })
      .catch((err) => console.error(err));
    getEmojis({ group: "Smileys & Emotion" })
      .then(array => array.map(x => x.emoji))
      .then(array => homePageLoaded(array[Math.floor(Math.random() * array.length)]))
      .catch((err) => { homePageLoaded("❌"); console.error(err); });
  }, []);
  /*
  // add boards
  useEffect(() => {
    getEmojis({ group: "Animals & Nature" }).then((arr) => addGetEmojiResponseAsBoard(arr)).then((str) => graphQlPost(str));
  }, []);
  */
  useEffect(() => {
    console.log('QUERY TEST:', getEmojis({ group: "Animals & Nature" }));
  }, []);
  const handleJoin = (joinData) => {
    console.log("handleJoin -> joinData", joinData);
    socket.emit("client:room/roomJoined", joinData);
    socket.on("server:room/roomJoined", (joinData) => {
      if (joinData) {
        roomJoined(joinData);
      } else {
        return;
      }
    });
  };
  return (
    <div className="App" align="center">
      {
        // player should only be defined if you're in a room
        player ?
          <GamePage socket={socket} /> :
          <HomePage handleJoin={handleJoin} roomID={roomID} />
      }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  roomID: state.room.roomID,
  player: state.room.player,
});

// actions : {type: TYPE, ...} ARE OBJECTS
// actionCreators : (obj) => {...action, ...obj} RETURN ACTIONS
// mapDispatchToProps will redefine actionCreators as such:
//      actionCreator(e) = dispatch(actionCreator(e))
// dispatch will give the new action to the reducer who can access state
// reducers : (state, action) => state'

// in order for Redux to wrap dispatch around roomJoined,
// it needs to be passed as a prop
const mapDispatchToProps = {
  roomJoined,
  gotBoards,
  homePageLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
