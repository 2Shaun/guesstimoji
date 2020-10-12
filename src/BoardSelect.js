import React from "react";
import { connect } from "react-redux";

const BoardSelect = ({ onClick, previews }) => {
  return (
    <>
      <h3>Select Board</h3>
      <div id="board-select">
        {
          previews
            ? previews.map((preview, index) => (
              <button
                id="board-select-button"
                onClick={() => onClick(index)}
                autoFocus={index == 1}
              >
                {previews[index]}
              </button>
            ))
            : null
        }
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  previews: state.boards.previews,
})

export default connect(mapStateToProps)(BoardSelect);
