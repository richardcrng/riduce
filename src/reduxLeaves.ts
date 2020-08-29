import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction, CustomReducers } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
> = [
  Reducer<TreeT>,
  ActionsProxy<TreeT, TreeT, CustomReducersT>
]

// function reduxLeaves<TreeT>(
//   initialState: TreeT
// ): ReduxLeaves<TreeT>

// function reduxLeaves<
//   TreeT,
//   CustomReducersT extends CustomReducers<TreeT> = {}
// >(
//   initialState: TreeT,
//   reducersDict: CustomReducersT
// ): ReduxLeaves<TreeT, CustomReducersT>

function reduxLeaves<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
>(
  initialState: TreeT,
  reducersDict: CustomReducersT = {} as CustomReducersT
): ReduxLeaves<TreeT, CustomReducersT> {
  const reducer = (treeState: TreeT = initialState, action: LeafStandardAction) => {
    if (!action.leaf) return treeState

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy(initialState, initialState, reducersDict)

  return [reducer as Reducer<TreeT>, actions]
}

export default reduxLeaves