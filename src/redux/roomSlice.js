// this reducer handles updates to id, board, and roomFull
// roomFull will decide to render gamePage
// id and board will be passed to gamePage
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
    board: [],
    randomSmiley: "😎"
  },
  action
) => {
  switch (action.type) {
    case "homePageLoaded":
      return {
        ...state,
        randomSmiley: action.payload,
      }
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
  console.log("roomJoined -> joinData", joinData);
  return {
    type: "room/roomJoined",
    payload: joinData,
  };
};

export const homePageLoaded = (emoji) => {
  return {
    type: "homePageLoaded",
    payload: emoji,
  }
}
