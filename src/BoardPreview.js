import React from "react";
import { connect } from "react-redux";

const BoardPreview = ({ i, onClick, previews }) => {
  // might be able to create an outer onClick function in here
  // which modifies look of board preview
  // and calls the props.onClick
  //const boardName = boardNames[i];
  console.log("BoardPreview -> previews", previews);
  return (
    <button
      id="board-select-button"
      onClick={() => onClick(i)}
      autoFocus={i == 1}
    >
      {previews ? previews[i] : ""}
    </button>
  );
};

const mapStateToProps = (state) => ({
  previews: state.boards.previews,
})

export default connect(mapStateToProps)(BoardPreview);
