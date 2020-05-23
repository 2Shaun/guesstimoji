import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = (props) => {
    return(
        <RoomTextBox
        />
    );
};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const RoomTextBox = () => {
    const [roomVal, setRoomVal] = useState(makeid(5));
    const handleChange = (event) => {
        const newRoom = event.target.value;
        setRoomVal(newRoom);
    }

    return(
        <div>
            <input value={roomVal} onChange={handleChange}  />
            <Link to={`/game?room=${roomVal}`} >
                <button 
          className="join"
          >
            Join
          </button>
          </Link>
        </div>
    );
};


export default Container;