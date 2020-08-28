// this reducer handles updates to id, board, and roomFull
// roomFull will decide to render gamePage
// id and board will be passed to gamePage
import { topEmojis } from "../emojis";
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const roomReducer = (
  state = {
    roomID: makeid(5),
    roomFull: false,
    board: topEmojis,
  },
  action
) => {
  switch (action.type) {
    case "room/roomJoined":
      console.log("new state update game", { ...state, ...action.payload });
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const roomJoined = (joinData) => {
  return {
    type: "room/roomJoined",
    payload: joinData,
  };
};
