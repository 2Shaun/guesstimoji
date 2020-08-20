import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoomTextBox from "./RoomTextBox";
// boards is a map where the key is name
// it returns an object of {data, preview}
import boards, { boardNames, smileys } from "../../boards";
import socket from "../../socketlocal";
//import socket from '../../socket';
import "../../index.css";
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

export default HomePage;
export { title };
