import React, { Component, useEffect, useState } from 'react';
import queryString from 'query-string';
//import socket from '../../socketlocal';
import '../../index.css';
import title from '../home/home.page'
import socket from '../../socket';

const allEmojis = ["😀","😁","😂","😃","😄","😅","😆","😇","😈","👿","😉","😊","☺️","😋","😌","😍","😎","😏","😐","😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀","👣","👤","👥","👶","👶🏻","👶🏼","👶🏽","👶🏾","👶🏿","👦","👦🏻","👦🏼","👦🏽","👦🏾","👦🏿","👧","👧🏻","👧🏼","👧🏽","👧🏾","👧🏿","👨","👨🏻","👨🏼","👨🏽","👨🏾","👨🏿","👩","👩🏻","👩🏼","👩🏽","👩🏾","👩🏿","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👫","👬","👭","👯","👰","👰🏻","👰🏼","👰🏽","👰🏾","👰🏿","👱","👱🏻","👱🏼","👱🏽","👱🏾","👱🏿","👲","👲🏻","👲🏼","👲🏽","👲🏾","👲🏿","👳","👳🏻","👳🏼","👳🏽","👳🏾","👳🏿","👴","👴🏻","👴🏼","👴🏽","👴🏾","👴🏿","👵","👵🏻","👵🏼","👵🏽","👵🏾","👵🏿","👮","👮🏻","👮🏼","👮🏽","👮🏾","👮🏿","👷","👷🏻","👷🏼","👷🏽","👷🏾","👷🏿","👸","👸🏻","👸🏼","👸🏽","👸🏾","👸🏿","💂","💂🏻","💂🏼","💂🏽","💂🏾","💂🏿","👼","👼🏻","👼🏼","👼🏽","👼🏾","👼🏿","🎅","🎅🏻","🎅🏼","🎅🏽","🎅🏾","🎅🏿","👻","👹","👺","💩","💀","👽","👾","🙇","🙇🏻","🙇🏼","🙇🏽","🙇🏾","🙇🏿","💁","💁🏻","💁🏼","💁🏽","💁🏾","💁🏿","🙅","🙅🏻","🙅🏼","🙅🏽","🙅🏾","🙅🏿","🙆","🙆🏻","🙆🏼","🙆🏽","🙆🏾","🙆🏿","🙋","🙋🏻","🙋🏼","🙋🏽","🙋🏾","🙋🏿","🙎","🙎🏻","🙎🏼","🙎🏽","🙎🏾","🙎🏿","🙍","🙍🏻","🙍🏼","🙍🏽","🙍🏾","🙍🏿","💆","💆🏻","💆🏼","💆🏽","💆🏾","💆🏿","💇","💇🏻","💇🏼","💇🏽","💇🏾","💇🏿","💑","👩‍❤️‍👩","👨‍❤️‍👨","💏","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","🙌","🙌🏻","🙌🏼","🙌🏽","🙌🏾","🙌🏿","👏","👏🏻","👏🏼","👏🏽","👏🏾","👏🏿","👂","👂🏻","👂🏼","👂🏽","👂🏾","👂🏿","👀","👃","👃🏻","👃🏼","👃🏽","👃🏾","👃🏿","👄","💋","👅","💅","💅🏻","💅🏼","💅🏽","💅🏾","💅🏿","👋","👋🏻","👋🏼","👋🏽","👋🏾","👋🏿","👍","👍🏻","👍🏼","👍🏽","👍🏾","👍🏿","👎","👎🏻","👎🏼","👎🏽","👎🏾","👎🏿","☝","☝🏻","☝🏼","☝🏽","☝🏾","☝🏿","👆","👆🏻","👆🏼","👆🏽","👆🏾","👆🏿","👇","👇🏻","👇🏼","👇🏽","👇🏾","👇🏿","👈","👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👉","👉🏻","👉🏼","👉🏽","👉🏾","👉🏿","👌","👌🏻","👌🏼","👌🏽","👌🏾","👌🏿","✌","✌🏻","✌🏼","✌🏽","✌🏾","✌🏿","👊","👊🏻","👊🏼","👊🏽","👊🏾","👊🏿","✊","✊🏻","✊🏼","✊🏽","✊🏾","✊🏿","✋","✋🏻","✋🏼","✋🏽","✋🏾","✋🏿","💪","💪🏻","💪🏼","💪🏽","💪🏾","💪🏿","👐","👐🏻","👐🏼","👐🏽","👐🏾","👐🏿","🙏","🙏🏻","🙏🏼","🙏🏽","🙏🏾","🙏🏿","🌱","🌲","🌳","🌴","🌵","🌷","🌸","🌹","🌺","🌻","🌼","💐","🌾","🌿","🍀","🍁","🍂","🍃","🍄","🌰","🐀","🐁","🐭","🐹","🐂","🐃","🐄","🐮","🐅","🐆","🐯","🐇","🐰","🐈","🐱","🐎","🐴","🐏","🐑","🐐","🐓","🐔","🐤","🐣","🐥","🐦","🐧","🐘","🐪","🐫","🐗","🐖","🐷","🐽","🐕","🐩","🐶","🐺","🐻","🐨","🐼","🐵","🙈","🙉","🙊","🐒","🐉","🐲","🐊","🐍","🐢","🐸","🐋","🐳","🐬","🐙","🐟","🐠","🐡","🐚","🐌","🐛","🐜","🐝","🐞","🐾","⚡️","🔥","🌙","☀️","⛅️","☁️","💧","💦","☔️","💨","❄️","🌟","⭐️","🌠","🌄","🌅","🌈","🌊","🌋","🌌","🗻","🗾","🌐","🌍","🌎","🌏","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌚","🌝","🌛","🌜","🌞","🍅","🍆","🌽","🍠","🍇","🍈","🍉","🍊","🍋","🍌","🍍","🍎","🍏","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪","🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","☕️","🍶","🍷","🍸","🍹","🍺","🍻","🍼","🎀","🎁","🎂","🎃","🎄","🎋","🎍","🎑","🎆","🎇","🎉","🎊","🎈","💫","✨","💥","🎓","👑","🎎","🎏","🎐","🎌","🏮","💍","❤️","💔","💌","💕","💞","💓","💗","💖","💘","💝","💟","💜","💛","💚","💙","🏃","🏃🏻","🏃🏼","🏃🏽","🏃🏾","🏃🏿","🚶","🚶🏻","🚶🏼","🚶🏽","🚶🏾","🚶🏿","💃","💃🏻","💃🏼","💃🏽","💃🏾","💃🏿","🚣","🚣🏻","🚣🏼","🚣🏽","🚣🏾","🚣🏿","🏊","🏊🏻","🏊🏼","🏊🏽","🏊🏾","🏊🏿","🏄","🏄🏻","🏄🏼","🏄🏽","🏄🏾","🏄🏿","🛀","🛀🏻","🛀🏼","🛀🏽","🛀🏾","🛀🏿","🏂","🎿","⛄️","🚴","🚴🏻","🚴🏼","🚴🏽","🚴🏾","🚴🏿","🚵","🚵🏻","🚵🏼","🚵🏽","🚵🏾","🚵🏿","🏇","🏇🏻","🏇🏼","🏇🏽","🏇🏾","🏇🏿","⛺️","🎣","⚽️","🏀","🏈","⚾️","🎾","🏉","⛳️","🏆","🎽","🏁","🎹","🎸","🎻","🎷","🎺","🎵","🎶","🎼","🎧","🎤","🎭","🎫","🎩","🎪","🎬","🎨","🎯","🎱","🎳","🎰","🎲","🎮","🎴","🃏","🀄️","🎠","🎡","🎢","🚃","🚞","🚂","🚋","🚝","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚨","🚕","🚖","🚗","🚘","🚙","🚚","🚛","🚜","🚲","🚏","⛽️","🚧","🚦","🚥","🚀","🚁","✈️","💺","⚓️","🚢","🚤","⛵️","🚡","🚠","🚟","🛂","🛃","🛄","🛅","💴","💶","💷","💵","🗽","🗿","🌁","🗼","⛲️","🏰","🏯","🌇","🌆","🌃","🌉","🏠","🏡","🏢","🏬","🏭","🏣","🏤","🏥","🏦","🏨","🏩","💒","⛪️","🏪","🏫","🇦🇺","🇦🇹","🇧🇪","🇧🇷","🇨🇦","🇨🇱","🇨🇳","🇨🇴","🇩🇰","🇫🇮","🇫🇷","🇩🇪","🇭🇰","🇮🇳","🇮🇩","🇮🇪","🇮🇱","🇮🇹","🇯🇵","🇰🇷","🇲🇴","🇲🇾","🇲🇽","🇳🇱","🇳🇿","🇳🇴","🇵🇭","🇵🇱","🇵🇹","🇵🇷","🇷🇺","🇸🇦","🇸🇬","🇿🇦","🇪🇸","🇸🇪","🇨🇭","🇹🇷","🇬🇧","🇺🇸","🇦🇪","🇻🇳","⌚️","📱","📲","💻","⏰","⏳","⌛️","📷","📹","🎥","📺","📻","📟","📞","☎️","📠","💽","💾","💿","📀","📼","🔋","🔌","💡","🔦","📡","💳","💸","💰","💎","🌂","👝","👛","👜","💼","🎒","💄","👓","👒","👡","👠","👢","👞","👟","👙","👗","👘","👚","👕","👔","👖","🚪","🚿","🛁","🚽","💈","💉","💊","🔬","🔭","🔮","🔧","🔪","🔩","🔨","💣","🚬","🔫","🔖","📰","🔑","✉️","📩","📨","📧","📥","📤","📦","📯","📮","📪","📫","📬","📭","📄","📃","📑","📈","📉","📊","📅","📆","🔅","🔆","📜","📋","📖","📓","📔","📒","📕","📗","📘","📙","📚","📇","🔗","📎","📌","✂️","📐","📍","📏","🚩","📁","📂","✒️","✏️","📝","🔏","🔐","🔒","🔓","📣","📢","🔈","🔉","🔊","🔇","💤","🔔","🔕","💭","💬","🚸","🔍","🔎","🚫","⛔️","📛","🚷","🚯","🚳","🚱","📵","🔞","🉑","🉐","💮","㊙️","㊗️","🈴","🈵","🈲","🈶","🈚️","🈸","🈺","🈷","🈹","🈳","🈂","🈁","🈯️","💹","❇️","✳️","❎","✅","✴️","📳","📴","🆚","🅰","🅱","🆎","🆑","🅾","🆘","🆔","🅿️","🚾","🆒","🆓","🆕","🆖","🆗","🆙","🏧","♈️","♉️","♊️","♋️","♌️","♍️","♎️","♏️","♐️","♑️","♒️","♓️","🚻","🚹","🚺","🚼","♿️","🚰","🚭","🚮","▶️","◀️","🔼","🔽","⏩","⏪","⏫","⏬","➡️","⬅️","⬆️","⬇️","↗️","↘️","↙️","↖️","↕️","↔️","🔄","↪️","↩️","⤴️","⤵️","🔀","🔁","🔂","#⃣","0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","🔢","🔤","🔡","🔠","ℹ️","📶","🎦","🔣","➕","➖","〰","➗","✖️","✔️","🔃","™","©","®","💱","💲","➰","➿","〽️","❗️","❓","❕","❔","‼️","⁉️","❌","⭕️","💯","🔚","🔙","🔛","🔝","🔜","🌀","Ⓜ️","⛎","🔯","🔰","🔱","⚠️","♨️","♻️","💢","💠","♠️","♣️","♥️","♦️","☑️","⚪️","⚫️","🔘","🔴","🔵","🔺","🔻","🔸","🔹","🔶","🔷","▪️","▫️","⬛️","⬜️","◼️","◻️","◾️","◽️","🔲","🔳","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛","🕜","🕝","🕞","🕟","🕠","🕡","🕢","🕣","🕤","🕥","🕦","🕧"];
// I chose 5 rows of 8 because of iPhone keyboard

const basicEmojis = ['😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔',
'😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱',
'😲','😳','😵','😷','😸','😹','😺','😻','😼','😽','😾','😿','🙀','🙅','🙆','🙇','🙈','🙉','🙊',
'🙋','🙌','🙍','🙎','🙏'];

const finnBoard = ['💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','👋','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩','💩'];
const momBoard = ['💕','💞','💓','💗','💖','💘','💝','💕','💞','💓','💗','💖','💘','💝','💕','💞','💓','💗','💖','💘','👋','💕','💞','💓','💗','💖','💘','💝','💕','💞','💓','💗','💖','💘','💝'];


const topEmojis = ['😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔',
'😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱',
'😲','😳','😵','😷','😸','😹','😺','😻','😼','😽','😾','😿','🙀','🙅','🙆','🙇','🙈','🙉','🙊',
'🙋','🙌','🙍','🙃','🙏'];

function randomArray(allEmojis){
  var arr = [];
  var i;
  for(i = 0; i < 40; i++){
    arr.push(allEmojis[Math.floor(Math.random()*allEmojis.length)]);
  }
  return arr;
}

// This is the VIEW in MVC

// props are a way of passing data from parent to child
//      props are passed to the component
// state is reserved for interactivity
//      states are modified within the component

// I can send requests with the root room
// the response will go to the game specific room

// I need to figure out how to pass down the values
const Game = (props) =>{
  const [roomAndBoard, setRoomAndBoard] = useState({roomVal: '', board: [], player: 0});
  // websocket should be created here but listen at the board
  // button handle functions are done at the board also

  // component needs to do something after EVERY render
  console.log(`game board is ${roomAndBoard.board} and roomval is ${roomAndBoard.roomVal}`);
  var newRoomVal; 
  useEffect(() => {
    newRoomVal = props.location.state.roomVal;
    const newGameBoard = props.location.state.board;
    socket.emit("joinRoom", {room: newRoomVal, board: newGameBoard});
    console.log(`joining room`);
    socket.on("gameUpdate", (data) => {
      console.log(`${socket.id} is player ${data.numPlayers}`);
      socket.off("gameUpdate");
      setRoomAndBoard({roomVal: newRoomVal, board: data.board, player: data.numPlayers});
    });
  },[]);
  // the empty array tells useEffect to only run once

    
  // state changes in a useEffect could cause an inf loop
  /*
  useEffect(() => {
    if(socket.room !== roomQuery ){
      socket.emit("subscribe", roomQuery);
      console.log(`Subscribed to ${socket.room} in useEffect`);
    }
  });
  */


  // the component will be mounted if the player number is found
  if(roomAndBoard.player === 0){
    return(<div></div>);
  } else if(roomAndBoard.player > 2){
    return(<div><p>ROOM IS FULL.</p></div>)
  } else {
  return(
    <div >
      <div >
        <RoomName room={roomAndBoard.roomVal} />
        <Board room={roomAndBoard.roomVal} board={roomAndBoard.board} player={roomAndBoard.player} />
      </div>
    </div>
  );
  }
};
/*
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      values: queryString.parse(window.location.search),
    };
  }

  render() {
  return(
  );
  }
}
*/

// there will need to be two boards
// I chose squares to be a state because
// I want the user to modify the board
// Board
//    states
//        squares
// if the onClick function is going to modify squares
// it needs to be in the scope of Board
// thus, it needs to be a prop of square
// this is why I am not making Board a functional component
// TODO : learn why it is bad to define functions
//        inside functional components
const RoomName = (props) => {
  return(
    <div> 
      <h3>Room Name: {props.room}</h3>
    </div>
  );
}

const Board = (props) => {
  //const [freshBoard, setFreshBoard] = useState(easterEgg(props.room));
  const [squares, setSquares] = useState(props.board);
  const [numPlayers, setNumPlayers] = useState(props.player);
  const [chose, setChose] = useState(false);
  

  function easterEgg(room){
    if(room === 'Mom'){
      return momBoard;
    } else if(room === 'Finn'){
      return finnBoard;
    } else {
      return props.board;
    }
  }

  // it'll be way easier to have the second player submit the board I think,
  // updating the board the other player has in Game
  socket.on(`setState`, (newSquares) => (setSquares(newSquares)));
  //socket.on(`setFreshBoard`, (newFreshBoard) => (setFreshBoard(newFreshBoard)));
  var newSquares = squares.slice();
  const handleClick = (i) => {
    // saves typing this.state.
    // can only change board if 2 players in room
    // will need some 'original player' condition if I 
    // allow players to spectate
      if(chose === false){
        socket.emit('newPick', {room: props.room, player: props.player, pick: props.board[i]});
        setChose(true);
        return;
      } else if(props.player === 1 || props.player === 2) {
        if(squares[i] === ' '){
          newSquares[i] = props.board[i];
        } else {
          newSquares[i] = ' ';
        }
      }else{
        return;
      }
      // sends a request to server to update board on click
      // might make it return something to synchronize events
      // emit to everyone in room but self
      // set square field without server
      socket.emit('newState', {squares: newSquares, room: props.room});
      setSquares(newSquares);
    };

  const renderSquare =(i) => {
  return(
        <Square
          index={i}
          value={squares[i]}
          onClick = {()=>{handleClick(i)}}
        />
        );
   };
   return(
     <div >
     <div class="board-row" >
       {renderSquare(0)}
       {renderSquare(1)}
       {renderSquare(2)}
       {renderSquare(3)}
       {renderSquare(4)}
       {renderSquare(5)}
       {renderSquare(6)}
     </div>
     <div class="board-row">
       {renderSquare(7)}
       {renderSquare(8)}
       {renderSquare(9)}
       {renderSquare(10)}
       {renderSquare(11)}
       {renderSquare(12)}
       {renderSquare(13)}
     </div>
     <div class="board-row">
       {renderSquare(14)}
       {renderSquare(15)}
       {renderSquare(16)}
       {renderSquare(17)}
       {renderSquare(18)}
       {renderSquare(19)}
       {renderSquare(20)}
     </div>
     <div class="board-row">
       {renderSquare(21)}
       {renderSquare(22)}
       {renderSquare(23)}
       {renderSquare(24)}
       {renderSquare(25)}
       {renderSquare(26)}
       {renderSquare(27)}
     </div>
     <div class="board-row">
       {renderSquare(28)}
       {renderSquare(29)}
       {renderSquare(30)}
       {renderSquare(31)}
       {renderSquare(32)}
       {renderSquare(33)}
       {renderSquare(34)}
     </div>
     <div>
         <Choice room={props.room}
         player={props.player} />
     </div>
     </div>
   );

  };


// Square
//    props
//      value
//      onClick 
function Square(props) {
  // note the use of jsx in onClick attribute and button content 
  const [squareVal, setSquareVal] = useState(props.value);
  return (
    <button 
      className="square"
      onClick={() => props.onClick()}
      >
        {props.value}
      </button>
  );
}

function Choice(props) {
  const [value, setValue] = useState('Select your emoji!');
  socket.on('pickReceived', (data) => {
    setValue(data);
  });
  return(
    <button 
      className="choice"
      onClick={() => props.onClick()}
      >
        {value}
    </button>
  );
}

export default Game;
