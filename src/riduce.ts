import { Reducer as ReactReducer } from 'react'
import { Reducer as ReduxReducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { Action, RiducerDict, isBundledAction } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

type Reducer<S, A extends Action> = ReactReducer<S, A> & ReduxReducer<S, A>

export type Riduce<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {},
> = [
  Reducer<TreeT, Action>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
]

export type RiduceRedux<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {},
> = [
  ReduxReducer<TreeT, Action>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
]

export type RiduceReact<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {},
> = [
  ReactReducer<TreeT, Action>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
]

function makeReducer<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
>(initialState: TreeT, riducerDict: RiducerDictT) {
  const reducer = (treeState: TreeT = initialState, action: Action): TreeT => {

    if (!action.leaf) return treeState

    if (isBundledAction(action)) {
      return action.payload.reduce(reducer, treeState)
    }

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState, riducerDict)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  return reducer
}

export function riduce<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): Riduce<TreeT, RiducerDictT> {
  const reducer = makeReducer(initialState, riducerDict)

  const actions = createActionsProxy(initialState, initialState, riducerDict)

  return [reducer, actions]
}

export function riduceReact<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): RiduceReact<TreeT, RiducerDictT> {
  const reducer = makeReducer(initialState, riducerDict)

  const actions = createActionsProxy(initialState, initialState, riducerDict)

  return [reducer as ReactReducer<TreeT, Action>, actions]
}

export function riduceRedux<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): RiduceRedux<TreeT, RiducerDictT> {
  const reducer = makeReducer(initialState, riducerDict)

  const actions = createActionsProxy(initialState, initialState, riducerDict)

  return [reducer as ReduxReducer<TreeT, Action>, actions]
}

// riduce.react = riduceReact
// riduce.redux = riduceRedux

export default riduce