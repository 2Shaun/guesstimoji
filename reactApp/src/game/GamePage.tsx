import React, { useEffect } from 'react';
import RoomName from './RoomName';
import OpponentBoard from './OpponentBoard';
import Board from './Board';
import GameLog from './GameLog';
import '../index.css';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { allPlayersBecameReady, roomRestartable } from '../redux/roomSlice';
import { turnSubmitted, cleared, gameRestarted } from '../redux/gameLogSlice';
import { clicked } from '../redux/opponentBoardSlice';
import { useAppSelector } from '../redux/hooks';
import { serverEvents } from '../events';
//import socket from '../../socket';

// This is the VIEW in MVC

interface Props extends PropsFromRedux {
    socket: any;
    winner: boolean;
}

const GamePage: React.FC<Props> = ({
    socket,
    winner,
    roomRestartable,
    allPlayersBecameReady,
    turnSubmitted,
    clicked,
    cleared,
}) => {
    const roomId = useAppSelector((state) => state.room.roomId);
    const roomFull = useAppSelector((state) => state.room.roomFull);
    const board = useAppSelector((state) => state.room.board);
    const allPlayersReady = useAppSelector(
        (state) => state.room.allPlayersReady
    );
    const player = useAppSelector((state) => state.room.player);

    useEffect(() => {
        const { _callbacks } = socket;
        const turnListeners =
            _callbacks[`$${serverEvents.gameLog.turnSubmitted}`];
        // this is for development only
        // useEffect with an empty array will run twice in StrictMode
        // causing 2 turn listeners on the socket
        if (!turnListeners) {
            socket.on(serverEvents.gameLog.turnSubmitted, turnSubmitted);
            socket.on(serverEvents.opponentBoard.clicked, clicked);
        }
    }, []);

    useEffect(() => {
        socket.on(serverEvents.gameLog.cleared, cleared);
        return () => socket.off(serverEvents.gameLog.cleared, cleared);
    }, []);

    useEffect(() => {
        if (winner) {
            roomRestartable();
        }
    }, [winner]);

    useEffect(() => {
        socket.on(
            serverEvents.room.allPlayersBecameReady,
            allPlayersBecameReady
        );
        return () =>
            socket.off(
                serverEvents.room.allPlayersBecameReady,
                allPlayersBecameReady
            );
    });

    // make sure that you check to see if you can import socket
    // or have to pass it as prop
    // the empty array tells useEffect to only run once

    // the component will be mounted if the player number is found
    return (
        <div>
            <div>
                <RoomName roomId={roomId} />
                <OpponentBoard board={board} />
                <Board board={board} socket={socket} player={player} />
                <GameLog
                    socket={socket}
                    roomId={roomId}
                    roomFull={roomFull}
                    player={player}
                    winner={winner}
                    allPlayersReady={allPlayersReady}
                />
                {
                    // Need 'Leave Room' button
                }
            </div>
        </div>
    );
};

// there will need to be two boards
// I chose squares to be a state because
// I want the user to modify the board
// Board
//    states
//        squares
// if the onClick function is going to modify squares
// it needs to be in the scope of Board
// thus, it needs to be a prop of square
// this is why I am not making Board a functional component
// TODO : learn why it is bad to define functions
//        inside functional components

// OpponentBoard will listen and update remotely

// Board will emit and update locally

// Square
//    props
//      value
//      onClick

const mapDispatchToProps = {
    turnSubmitted,
    clicked,
    cleared,
    roomRestartable,
    allPlayersBecameReady,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GamePage);
