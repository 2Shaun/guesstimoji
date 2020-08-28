import React from "react";
import { useDispatch } from "react-redux";

const JoinRoomButton = ({ roomID, board, handleJoin }) => {
  console.log(board);
  const dispatch = useDispatch();
  return (
    <button
      id="board-select-button"
      onClick={() => handleJoin(dispatch, { roomID: roomID, board: board })}
    >
      PLAY
    </button>
  );
};

export default JoinRoomButton;
