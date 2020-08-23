i know that `socket.on` must be outside of the component tree
the question is: what is the best way to store/modify chat so that the `socket.on` listeners can trigger a change of state, globally?
_ an action needs to be dispatched by the listener
_ a reducer describes how the state tree is transformed by actions \* these do not mutate the previous state but return a new state object
