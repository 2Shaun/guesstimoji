import io from "socket.io-client";
let socket = io("http://localhost:4001");
export default socket;