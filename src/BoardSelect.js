import React from "react";
import BoardPreview from "./BoardPreview";

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

export default BoardSelect;
