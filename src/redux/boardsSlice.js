export const boardsReducer = (
  state = [[], [], []],
  action
) => {
  switch (action.type) {
    case "gotBoards":
      return action.payload;
    default:
      return state;
  }
};

export const gotBoards = (boards) => ({
  type: "gotBoards",
  payload: boards,
});
