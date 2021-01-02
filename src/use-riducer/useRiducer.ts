import { useState, useReducer } from "react";
import riduce from "../riduce";

function useRiducer<S>(initialState: S) {
  const [[reducer, actions]] = useState(riduce(initialState));
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    actions,
    reducer,
  };
}

export default useRiducer;
