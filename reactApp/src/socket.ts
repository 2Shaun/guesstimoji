import io from 'socket.io-client';

const gameApiUrl =
    (process.env.REACT_APP_PROTOCOL as string) + process.env.REACT_APP_HOST;

let socket = io(gameApiUrl);
export default socket;
