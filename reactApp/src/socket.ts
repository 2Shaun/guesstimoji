import io from 'socket.io-client';

const gameApiUrl =
    (process.env.REACT_APP_PROTOCOL as string) +
    process.env.REACT_APP_HOST +
    ':' +
    process.env.REACT_APP_GAME_API_PORT;

let socket = io(gameApiUrl);
export default socket;
