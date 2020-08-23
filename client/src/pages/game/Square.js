import React, { useState } from "react";
function Square(props) {
  // note the use of jsx in onClick attribute and button content
  const [show, setShow] = useState(true);

  return (
    <button
      className="square"
      onClick={props.onClick ? props.onClick : () => setShow(!show)}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onContextMenu();
      }}
    >
      {show ? props.value : null}
    </button>
  );
}

export default Square;
