import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RoomTextBox from "./RoomTextBox";
import { getEmojis } from "./apiUtils";
// boards is a map where the key is name
// it returns an object of {data, preview}
import "./index.css";


const HomePage = ({ handleJoin, roomID, randomSmiley }) => {
  return (
    <div>
      <h1 align="center">{"GUESSTIM" + randomSmiley + "JI"}</h1>
      <RoomTextBox handleJoin={handleJoin} roomID={roomID} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  randomSmiley: state.room.randomSmiley,
})

export default connect(mapStateToProps)(HomePage);
