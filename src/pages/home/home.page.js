import React, { useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

const socket = io('http://localhost:4001');
var room;
socket.on('connect', () => {
    room = socket.id.replace(/[^a-zA-Z0-9]/g, "");
    room = room.substring(0,8);
    socket.emit('roomFound', room);
});

// needs to connect to server and generate a RoomID off
// socket.id
// Create needs to create a socket.io room
// Join needs to join a socket.io room
class Container extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            idVal: room,
            undefined: true 
        };
    };
    
    handleClick(x){
        if(x === 'c'){
            // might be safer to make room
            // as soon as page loads
            this.setState({idVal: document.getElementById("room").value})
            socket.emit('roomFound', this.idVal);

        }else if (x === 'j'){

        }
    }

    render() {
    socket.on('updateUI', (data) => {
        this.setState({idVal: data, undefined: false});
    });
    return(
        <div>
        {<RoomTextBox value={this.idVal} onChange={(newRoom) => this.setState({idVal: newRoom})}/>}
        {<JoinButton disabled={this.undefined} room={this.idVal} onClick={() =>{}} />}
        </div>
    );
    }



}
/*
function IDTextBox() {
    const [value, setValue] = useState(room);
    socket.on('updateUI', (data) => {
        setValue(data);
    });

    handleChange(event) {
        setValue(event.target.value);
    };
    return(
        <input type="text" id="room" onChange={hangleChange} value={value} />
    );
}
*/

class RoomTextBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: room
        };
        this.handleChange = this.handleChange.bind(this);
        socket.on('updateUI', (data) => {
            this.setState({value: data});
        });
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        const newRoom = event.target.value;
        this.props.onChange(newRoom);
    }

    render(){
        return (
            <input type="text" id="room" value={this.state.value} onChange={this.handleChange} />
        );
    }
}

function JoinButton(props) {
    const [value, setValue] = useState(room);
    const [disabled, setDisabled] = useState(true);
    socket.on('updateUI', (data) => {
        setValue(data);
        setDisabled(false);
    });
    if(disabled === false){
    return (
        <Link to={`/game?room=${document.getElementById("room").value}`} >
        <button 
          className="join"
          onClick={() => props.onClick()}
          >
            Join
          </button>
          </Link>
      );
    }else{
        return(
        <button
            className="join"
            >Join</button>
        );
    }
}

function IDInputBox() {

}

export default Container;