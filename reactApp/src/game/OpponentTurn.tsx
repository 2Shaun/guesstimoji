interface Props {
    opponent: number;
    askingTurn: boolean;
}
const OpponentTurn = ({ opponent, askingTurn }: Props) =>
    askingTurn ? (
        <div>{`Waiting for Player ${opponent} to ask...`}</div>
    ) : (
        <div>{`Waiting for Player ${opponent} to answer your question...`}</div>
    );

export default OpponentTurn;
