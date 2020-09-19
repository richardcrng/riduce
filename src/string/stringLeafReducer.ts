import { isConcatActionString } from './string-types';
import { Action, isClearAction } from '../types';
import universalLeafReducer from '../universal/universalLeafReducer';

function stringLeafReducer<L extends string, T, A extends Action>(
  leafState: L,
  treeState: T,
  action: A,
  originalState: T,
): L {
  if (isConcatActionString(action)) {
    return leafState.concat(action.payload) as L;
  }

  if (isClearAction(action)) {
    return '' as L;
  }

  return universalLeafReducer(leafState, treeState, action, originalState);
}

export default stringLeafReducer;
