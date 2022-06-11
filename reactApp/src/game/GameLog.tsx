import TurnHandler from './TurnHandler';
import { connect, ConnectedProps } from 'react-redux';
import { turnSubmitted } from '../redux/gameLogSlice';
import { useAppSelector } from '../redux/hooks';

interface Props extends PropsFromRedux {
    socket: any;
    roomId: string;
    roomFull: boolean;
    player: number;
    winner: boolean;
    allPlayersReady: boolean;
}

const GameLog = ({
    socket,
    roomId,
    roomFull,
    player,
    winner,
    allPlayersReady,
    turnSubmitted,
}: Props) => {
    const gameLog = useAppSelector((state) => state.gameLog);

    const handleSubmitTurn: HandleSubmitTurn = (untrimmedMessage) => {
        const message = untrimmedMessage.trim();
        socket.emit('client:gameLog/turnSubmitted', {
            player: player,
            message: message,
        });
        turnSubmitted({ username: 'You', message: message });
    };

    const renderGameLog = () => {
        // the second argument of map is optional, takes in the index
        // of the element
        // don't use curly brace tuples that don't have tags!!
        return gameLog.map(({ username: username, message: message }, i) => (
            <div
                className={
                    i === 0 ? 'game-log-last-message' : 'game-log-message'
                }
                key={i}
            >
                <span>{username + ':'}</span>
                <span>{message}</span>
            </div>
        ));
    };
    return (
        <div>
            <TurnHandler
                socket={socket}
                player={player}
                turn={gameLog.length}
                roomId={roomId}
                roomFull={roomFull}
                handleSubmitTurn={handleSubmitTurn}
                winner={winner}
                allPlayersReady={allPlayersReady}
            />
            <div className="game-log-box">{renderGameLog()}</div>
        </div>
    );
};

const mapDispatchToProps = {
    turnSubmitted,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameLog);
