import {
  isDoAction,
  isUpdateAction,
  isResetAction,
  isNoopAction,
} from "./universal-types";
import { Action } from "../types";
import { getState } from "../utils/update-state";

function universalLeafReducer<L, T, A extends Action>(
  leafState: L,
  treeState: T,
  action: A,
  originalState: T
): L {
  if (isDoAction<L, T>(action)) {
    return action.payload(leafState, treeState);
  }

  if (isUpdateAction<L>(action)) {
    return action.payload;
  }

  if (isResetAction(action)) {
    return getState(originalState, action.leaf.path) as L;
  }

  if (isNoopAction(action)) {
    return leafState;
  }

  return leafState;
}

export default universalLeafReducer;
