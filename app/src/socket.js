import io from "socket.io-client";
let socket = io(process.env.GAME_API_URL);
export default socket;
