import React, { useState } from "react";
import RoomTextBox from "./RoomTextBox";
import { smileys } from "./boards";
// boards is a map where the key is name
// it returns an object of {data, preview}
import "./index.css";

const smiley = smileys[Math.floor(Math.random() * smileys.length)];
const title = "GUESSTIM" + smiley + "JI";

const HomePage = ({ handleJoin, roomID }) => {
  return (
    <div>
      <h1 align="center">{title}</h1>
      <RoomTextBox handleJoin={handleJoin} roomID={roomID} />
    </div>
  );
};

export default HomePage;
export { title };
