import React from 'react';

// Select component which will take in rooms or preview
const Select = ({ header, emptyMessage, onClick, selections }) => {
    return (
        <>
            <h3>{header}</h3>
            <div id="board-select">
                {selections != null && selections.length > 0
                    ? selections.map((_, index) => (
                          <button
                              id="board-select-button"
                              onClick={() => onClick(index)}
                              autoFocus={index == 1}
                          >
                              {selections[index]}
                          </button>
                      ))
                    : `${emptyMessage}`}
            </div>
        </>
    );
};

export default Select;
