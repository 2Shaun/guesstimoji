import React, { useState } from "react";
import boards, { boardNames, smileys } from "../../boards";
import { Link } from "react-router-dom";
import BoardSelect from "./BoardSelect";
import JoinRoomButton from "./JoinRoomButton";
const RoomTextBox = ({ handleJoin, roomID }) => {
  // the idea is to hold tempBoard and tempID in component state
  // and hold the 'real' board and 'real' id in store
  // store id and board will be updated on PLAY
  // this allows me to not have to connect the home page
  // to the store
  const [tempBoard, setTempBoard] = useState(boards.get(boardNames[1]).data);
  const [tempRoomID, setTempRoomID] = useState(roomID);

  const handleBoardClick = (i) => {
    setTempBoard(boards.get(boardNames[i]).data);
  };

  const handleChange = (e) => {
    setTempRoomID(e.target.value);
  };

  return (
    <div align="center">
      Room ID:
      <input value={tempRoomID} onChange={handleChange} />
      <Link
        to={{
          pathname: "/game",
        }}
      >
        <JoinRoomButton
          roomID={tempRoomID}
          board={tempBoard}
          handleJoin={handleJoin}
        />
      </Link>
      <BoardSelect onClick={handleBoardClick} />
    </div>
  );
};

export default RoomTextBox;
