import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from './Select';
import JoinRoomButton from './JoinRoomButton';
import { connect } from 'react-redux';

const HomePageDiv = ({
    boards,
    previews,
    rooms,
    handleJoin,
    roomID,
    socket,
}) => {
    // the idea is to hold tempBoard and tempID in component state
    // and hold the 'real' board and 'real' id in store
    // store id and board will be updated on PLAY
    // this allows me to not have to connect the home page
    // to the store
    const [tempBoard, setTempBoard] = useState(boards ? boards[0] : null);
    const [tempRoomID, setTempRoomID] = useState(roomID);

    const handleBoardClick = (i) => {
        setTempBoard(boards[i]);
    };

    const handleRoomClick = (i) => {
        // join room should not require board
        handleJoin({
            roomID: rooms[i],
            board: [],
        });
    };

    const handleChange = (e) => {
        setTempRoomID(e.target.value);
    };

    return (
        <div align="center">
            Room ID:
            <input
                data-testid="roomId"
                value={tempRoomID}
                onChange={handleChange}
            />
            <JoinRoomButton
                roomID={tempRoomID}
                board={tempBoard}
                handleJoin={handleJoin}
            />
            <Select
                header={'Select Board'}
                selections={previews}
                onClick={handleBoardClick}
                emptyMessage={'Waiting for boards fetch... ⌛'}
            />
            <Select
                header={'Join Room'}
                selections={rooms}
                onClick={handleRoomClick}
                emptyMessage={'There are no rooms 🥺 Make one or refresh!'}
            />
            <button
                id="board-select-button"
                onClick={() => socket.emit('client:rooms/roomsRequested')}
            >
                Refresh Rooms
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    boards: state.boards.boards,
    previews: state.boards.previews,
    rooms: state.rooms,
});

export default connect(mapStateToProps)(HomePageDiv);
