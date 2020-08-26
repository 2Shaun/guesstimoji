import React from "react";
import boards, { boardNames, smileys } from "../../boards";
const BoardPreview = (props) => {
  // might be able to create an outer onClick function in here
  // which modifies look of board preview
  // and calls the props.onClick
  const boardName = boardNames[props.i];
  const preview = boards.get(boardName).data.join("");
  return (
    <button
      id="board-select-button"
      onClick={() => props.onClick(props.i)}
      autoFocus={props.i == 1}
    >
      {preview}
    </button>
  );
};

export default BoardPreview;
