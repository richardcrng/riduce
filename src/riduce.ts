import leafReducer from "./leafReducer";
import { createActionsProxy } from "./proxy";
import { ActionsProxy } from "./proxy/createActionsProxy";
import { Action, RiducerDict, isBundledAction } from "./types";
import updateState, { getState } from "./utils/update-state";

export type Reducer<TreeT, ActionT extends Action> = (
  treeState: TreeT | undefined,
  action: ActionT
) => TreeT;

export type Riduce<TreeT, RiducerDictT extends RiducerDict<TreeT> = {}> = [
  Reducer<TreeT, Action>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
];

function makeReducer<TreeT, RiducerDictT extends RiducerDict<TreeT> = {}>(
  initialState: TreeT,
  riducerDict: RiducerDictT
): Reducer<TreeT, Action> {
  const reducer = (treeState: TreeT = initialState, action: Action): TreeT => {
    if (!action.leaf) return treeState;

    if (isBundledAction(action)) {
      return action.payload.reduce(reducer, treeState);
    }

    const prevLeafState = getState(treeState, action.leaf.path);

    const newLeafState = leafReducer(
      prevLeafState,
      treeState,
      action,
      initialState,
      riducerDict
    );

    return updateState(treeState, action.leaf.path, newLeafState);
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
