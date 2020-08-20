import React, { useState } from "react";
import { Link } from "react-router-dom";
// boards is a map where the key is name
// it returns an object of {data, preview}
import boards, { boardNames, smileys } from "../../boards";
import socket from "../../socketlocal";
//import socket from '../../socket';
import "../../index.css";
import { useDispatch } from "react-redux";
import { updateID } from "../../redux/actions";

const smiley = smileys[Math.floor(Math.random() * smileys.length)];
const title = "GUESSTIM" + smiley + "JI";

const HomePage = ({ handleJoin, id }) => {
  return (
    <div>
      <h1 align="center">{title}</h1>
      <RoomTextBox handleJoin={handleJoin} id={id} />
    </div>
  );
};

const RoomTextBox = ({ handleJoin, id }) => {
  // the idea is to hold tempBoard and tempID in component state
  // and hold the 'real' board and 'real' id in store
  // store id and board will be updated on PLAY
  // this allows me to not have to connect the home page
  // to the store
  const [tempBoard, setTempBoard] = useState(boards.get(boardNames[1]).data);
  const [tempID, setTempID] = useState(id);

  const handleBoardClick = (i) => {
    setTempBoard(boards.get(boardNames[i]).data);
  };

  const handleChange = (e) => {
    setTempID(e.target.value);
  };

  return (
    <div align="center">
      Room ID:
      <input value={tempID} onChange={handleChange} />
      <Link
        to={{
          pathname: `/game`,
        }}
      >
        <JoinRoom id={tempID} board={tempBoard} handleJoin={handleJoin} />
      </Link>
      <BoardSelect onClick={handleBoardClick} />
    </div>
  );
};

const JoinRoom = ({ id, board, handleJoin }) => {
  const dispatch = useDispatch();
  return (
    <button
      id="board-select-button"
      onClick={() => handleJoin(dispatch, { id: id, board: board })}
    >
      PLAY
    </button>
  );
};

const BoardSelect = (props) => {
  const renderBoardPreview = (i) => {
    return <BoardPreview i={i} onClick={props.onClick} />;
  };
  return (
    <div>
      <h3>Select Board</h3>
      <div id="board-select">
        {renderBoardPreview(1)}
        {renderBoardPreview(2)}
        {renderBoardPreview(3)}
        {renderBoardPreview(5)}
        {renderBoardPreview(6)}
        {renderBoardPreview(7)}
        {renderBoardPreview(8)}
        {renderBoardPreview(0)}
      </div>
    </div>
  );
};

const BoardPreview = (props) => {
  // might be able to create an outer onClick function in here
  // which modifies look of board preview
  // and calls the props.onClick
  const boardName = boardNames[props.i];
  const preview = boards.get(boardName).data.join(" ");
  if (props.i == 1) {
    return (
      <button
        id="board-select-button"
        onClick={() => props.onClick(props.i)}
        autoFocus
      >
        {preview}
      </button>
    );
  }
  return (
    <button id="board-select-button" onClick={() => props.onClick(props.i)}>
      {preview}
    </button>
  );
};

export default HomePage;
export { title };
