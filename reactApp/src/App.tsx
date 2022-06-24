import { useEffect } from 'react';
import socket from './socket';
import HomePage from './HomePage';
import GamePage from './game/GamePage';
import Footer from './Footer';
import './index.css';
import { connect, ConnectedProps } from 'react-redux';
import { homePageLoaded, roomJoined, player2Joined } from './redux/roomSlice';
import { getBoards, getEmojis } from './apiUtils';
import { gotBoards } from './redux/boardsSlice';
import { gotRooms } from './redux/roomsSlice';
import { useAppSelector } from './redux/hooks';
import { clientEvents, serverEvents } from './events';
// view layer

// handleJoin data should have both id and board selection

// the first argument to a component is always the props obj
const App: React.FC<PropsFromRedux> = ({
    roomJoined,
    homePageLoaded,
    gotBoards,
    gotRooms,
    player2Joined,
}) => {
    const roomId = useAppSelector((state) => state.room.roomId);
    const player = useAppSelector((state) => state.room.player);

    useEffect(() => {
        getBoards('{getBoards{emojis}}')
            .then((res) => res.map((x) => x.emojis))
            .then(gotBoards)
            .catch((err) => console.error(err));
        getEmojis({ group: 'Smileys & Emotion' })
            .then((array) => array.map((x) => x.emoji))
            .then((array) =>
                homePageLoaded(array[Math.floor(Math.random() * array.length)])
            )
            .catch((err) => {
                homePageLoaded('❌');
                console.error(err);
            });
        socket.emit(clientEvents.rooms.roomsRequested);
        socket.on(serverEvents.rooms.roomsResponded, gotRooms);

        return () => {
            socket.off(serverEvents.rooms.roomsResponded, gotRooms);
        };
    }, []);

    const handleJoin: HandleJoin = (joinData) => {
        socket.emit(clientEvents.room.roomJoined, joinData);
        /*
        joinData {
            roomId
            board

        }
        */
        socket.on(serverEvents.room.roomJoined, (joinData: ServerJoinData) => {
            roomJoined(joinData);
        });

        socket.on(serverEvents.room.player2Joined, player2Joined);
    };

    return (
        <div className="App">
            {
                // player should only be defined if you're in a room
                // might wanna turn this into a switch statement
                // page state = {home, game, find}
                player ? (
                    <GamePage socket={socket} winner={false} />
                ) : (
                    <HomePage
                        handleJoin={handleJoin}
                        roomId={roomId}
                        socket={socket}
                    />
                )
            }
            <Footer />
        </div>
    );
};

// actions : {type: TYPE, ...} ARE OBJECTS
// actionCreators : (obj) => {...action, ...obj} RETURN ACTIONS
// mapDispatchToProps will redefine actionCreators as such:
//      actionCreator(e) = dispatch(actionCreator(e))
// dispatch will give the new action to the reducer who can access state
// reducers : (state, action) => state'

// in order for Redux to wrap dispatch around roomJoined,
// it needs to be passed as a prop
const mapDispatchToProps = {
    roomJoined,
    gotBoards,
    gotRooms,
    homePageLoaded,
    player2Joined,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
