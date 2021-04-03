import io from 'socket.io-client';
let socket = io('http://gameApi:5000');
export default socket;
