import PlayerTurn from './PlayerTurn';
import OpponentTurn from './OpponentTurn';
import { useAppSelector } from '../redux/hooks';

interface Props {
    socket: any;
    player: number;
    turn: number;
    roomId: string;
    roomFull: boolean;
    handleSubmitTurn: HandleSubmitTurn;
    winner: boolean;
    allPlayersReady: boolean;
}

const TurnHandler = ({
    socket,
    player,
    turn,
    roomId,
    roomFull,
    handleSubmitTurn,
    winner,
    allPlayersReady,
}: Props) => {
    const picked = useAppSelector((state) => state.picked);
    // turn 1/2 is answering yes or no
    // turn 2/2 is asking a question
    // TURN CYCLE:
    // player 2 turn 2/2  (turn 0)
    // player 1 turn 1/2
    // player 1 turn 2/2
    // player 2 turn 1/2
    const player1Turn = turn % 4 === 1 || turn % 4 === 2;
    const player2Turn = !player1Turn;
    const playerTurn =
        (player === 1 && player1Turn) || (player === 2 && player2Turn);
    const askingTurn = turn % 2 === 0;
    const opponent = (player % 2) + 1;

    // message can be populated with yes/no button or

    // if send is available as soon as you join
    // the gameLog room for player 2 will need to be updated when they join
    if (winner) {
        // need 'New Game' button which brings up board select for player 1
        // need 'Waiting for Player 1 to start a new game...' for player 2
        return <div>GAME OVER</div>;
    } else if (!roomFull) {
        return <div>Waiting for Player 2 to join...</div>;
    } else if (!picked) {
        return <div></div>;
    } else if (!allPlayersReady) {
        return <div>Waiting for opponent to select emoji...</div>;
    } else {
        return playerTurn ? (
            <PlayerTurn
                handleSubmitTurn={handleSubmitTurn}
                askingTurn={askingTurn}
            />
        ) : (
            <OpponentTurn opponent={opponent} askingTurn={askingTurn} />
        );
    }
};

export default TurnHandler;
