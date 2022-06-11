interface JoinRoomButtonProps {
    roomId: string;
    board?: string[];
    handleJoin: any;
}

const JoinRoomButton = ({ roomId, board, handleJoin }: JoinRoomButtonProps) => {
    return (
        <button
            id="board-select-button"
            onClick={() => handleJoin({ roomId: roomId, board: board })}
        >
            PLAY
        </button>
    );
};

export default JoinRoomButton;
