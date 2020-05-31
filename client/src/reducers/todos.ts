const InitialState = {
  todoReq: 0,
};

export default function todoReducer(state = InitialState, action: any) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, todoReq: state.todoReq + 1 };
    default:
      return state;
  }
}
