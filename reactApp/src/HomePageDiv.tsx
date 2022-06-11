import React, { useState } from 'react';
import Select from './Select';
import JoinRoomButton from './JoinRoomButton';
import { useAppSelector } from './redux/hooks';

interface Props {
    handleJoin: HandleJoin;
    roomId: string;
    socket: any;
}

const HomePageDiv = ({ handleJoin, roomId, socket }: Props) => {
    const boards = useAppSelector((state) => state.boards.boards);
    const previews = useAppSelector((state) => state.boards.previews);
    const rooms = useAppSelector((state) => state.rooms);
    // the idea is to hold tempBoard and tempID in component state
    // and hold the 'real' board and 'real' id in store
    // store id and board will be updated on PLAY
    // this allows me to not have to connect the home page
    // to the store
    const [tempBoard, setTempBoard] = useState(boards[0]);
    const [tempRoomID, setTempRoomID] = useState(roomId);

    const handleBoardClick = (i: number) => {
        setTempBoard(boards[i]);
    };

    const handleRoomClick = (i: number) => {
        handleJoin({
            board: tempBoard,
            roomId: rooms[i],
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempRoomID(e.target.value);
    };

    return (
        // TODO: Center?
        <div>
            Room ID:
            <input
                data-testid="roomId"
                value={tempRoomID}
                onChange={handleChange}
            />
            <JoinRoomButton
                roomId={tempRoomID}
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

export default HomePageDiv;
