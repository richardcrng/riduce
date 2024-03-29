import leafReducer from "./leafReducer";
import { createActionsProxy } from "./proxy";
import { ActionsProxy } from "./proxy/createActionsProxy";
import {
  RiducerDict,
  isBundledAction,
  isCallbackAction,
  RiduceAction,
  OrdinaryAction,
  isRiduceAction,
} from "./types";
import updateState, { getState } from "./utils/update-state";

export type Reducer<TreeT, ActionT> = (
  treeState: TreeT | undefined,
  action: ActionT
) => TreeT;

export type Riduce<TreeT, RiducerDictT extends RiducerDict<TreeT> = {}> = [
  Reducer<TreeT, RiduceAction<TreeT> | OrdinaryAction>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
];

function makeReducer<TreeT, RiducerDictT extends RiducerDict<TreeT> = {}>(
  initialState: TreeT,
  riducerDict: RiducerDictT
): Reducer<TreeT, RiduceAction<TreeT> | OrdinaryAction> {
  const reducer = (
    treeState: TreeT = initialState,
    action: RiduceAction<TreeT> | OrdinaryAction
  ): TreeT => {
    if (!isRiduceAction(action, treeState)) return treeState;

    if (isCallbackAction(action)) {
      const createdAction = action(treeState);
      return reducer(treeState, createdAction);
    } else if (isBundledAction(action)) {
      return action.payload.reduce(reducer, treeState);
    } else {
      const prevLeafState = getState(treeState, action.leaf.path);

      const newLeafState = leafReducer(
        prevLeafState,
        treeState,
        action,
        initialState,
        riducerDict
      );

      return updateState(treeState, action.leaf.path, newLeafState);
    }
  };

  return reducer;
}

export function riduce<TreeT, RiducerDictT extends RiducerDict<TreeT> = {}>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): Riduce<TreeT, RiducerDictT> {
  const reducer = makeReducer(initialState, riducerDict);

  const actions = createActionsProxy(initialState, initialState, riducerDict);

  return [reducer, actions];
}

export default riduce;
