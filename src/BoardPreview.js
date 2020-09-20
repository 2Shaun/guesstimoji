import React from "react";
import { boardNames, smileys } from "./boards";
import { connect } from "react-redux";

const BoardPreview = ({ i, onClick, boards }) => {
  // might be able to create an outer onClick function in here
  // which modifies look of board preview
  // and calls the props.onClick
  //const boardName = boardNames[i];
  const preview = boards[i].join("");
  //console.log("BoardPreview -> boards", boards);
  return (
    <button
      id="board-select-button"
      onClick={() => onClick(i)}
      autoFocus={i == 1}
    >
      {preview}
    </button>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
})

export default connect(mapStateToProps)(BoardPreview);
