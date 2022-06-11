interface Props {
    roomId: string;
}

const RoomName = ({ roomId }: Props) => {
    return (
        <div>
            <h3>Room Name: {roomId}</h3>
        </div>
    );
};

export default RoomName;
