import { Action } from "../types";
import universalLeafReducer from "../universal/universalLeafReducer";

function undefinedLeafReducer<L extends undefined, T, A extends Action>(
  leafState: L,
  treeState: T,
  action: A,
  originalState: T
): L {
  return universalLeafReducer(leafState, treeState, action, originalState);
}

export default undefinedLeafReducer;
