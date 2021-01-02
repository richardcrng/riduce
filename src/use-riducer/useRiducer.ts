import { useRef, useReducer } from "react";
import riduce from "../riduce";
import { RiducerDict } from "../types";

function useRiducer<TreeT, RiducerDictT extends RiducerDict<TreeT>>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
) {
  const riduceRef = useRef(riduce(initialState, riducerDict));
  const [reducer, actions] = riduceRef.current;
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    actions,
    reducer,
  };
}

export default useRiducer;
