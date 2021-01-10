import { useRef, useReducer, Dispatch } from "react";
import riduce, { Reducer } from "../riduce";
import { Action, ActionsProxy, RiducerDict } from "../types";

type UsedRiducer<TreeT, RiducerDictT extends RiducerDict<TreeT>> = {
  state: TreeT;
  dispatch: Dispatch<Action>;
  actions: ActionsProxy<TreeT, TreeT, RiducerDictT>;
  reducer: Reducer<TreeT, Action>;
};

function useRiducer<TreeT, RiducerDictT extends RiducerDict<TreeT>>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): UsedRiducer<TreeT, RiducerDictT> {
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
