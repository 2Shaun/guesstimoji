import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoardSelect from "./BoardSelect";
import JoinRoomButton from "./JoinRoomButton";
import { connect } from "react-redux";

const RoomTextBox = ({ boards, handleJoin, roomID }) => {
  // the idea is to hold tempBoard and tempID in component state
  // and hold the 'real' board and 'real' id in store
  // store id and board will be updated on PLAY
  // this allows me to not have to connect the home page
  // to the store
  const [tempBoard, setTempBoard] = useState(boards ? boards[0] : null);
  const [tempRoomID, setTempRoomID] = useState(roomID);

  const handleBoardClick = (i) => {
    setTempBoard(boards[i]);
  };

  const handleChange = (e) => {
    setTempRoomID(e.target.value);
  };

  return (
    <div align="center">
      Room ID:
      <input value={tempRoomID} onChange={handleChange} />
      <JoinRoomButton
        roomID={tempRoomID}
        board={tempBoard}
        handleJoin={handleJoin}
      />
      <BoardSelect onClick={handleBoardClick} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
})

export default connect(mapStateToProps)(RoomTextBox);
