import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import { atomicActions } from '../../atomic'

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

const makeCreateDefaults = (path: string[]) => (actionType?: string | LeafActionTypeCreator) => {
  const producerOfLeafStandardActions = makeProducerOfLeafStandardActions(actionType)(path)
  return {
    apply: (callback: (leafState: any, treeState: any) => any) => producerOfLeafStandardActions(atomicActions.APPLY)(callback),
    assign: (...sources: object[]) => producerOfLeafStandardActions(atomicActions.ASSIGN)(sources),
    clear: (toNull: boolean = false) => producerOfLeafStandardActions(atomicActions.CLEAR)(toNull),
    concat: (arrayOrString: any[] | string) => producerOfLeafStandardActions(atomicActions.CONCAT)(arrayOrString),
    drop: (n: number = 1) => producerOfLeafStandardActions(atomicActions.DROP)(n),
    filter: (callback: (element: any, index: number, array: any[]) => any[]) => producerOfLeafStandardActions(atomicActions.FILTER)(callback),
    increment: (n: number = 1) => producerOfLeafStandardActions(atomicActions.INCREMENT)(n),
    off: () => producerOfLeafStandardActions(atomicActions.OFF)(),
    on: () => producerOfLeafStandardActions(atomicActions.ON)(),
    path: (path: string[], value: any) => producerOfLeafStandardActions(atomicActions.SET)({ path, value }),
    push: (element: any, index: number = -1, replace: boolean = false) => producerOfLeafStandardActions(atomicActions.PUSH)({ element, index, replace }),
    // replace: (pattern: string | RegExp, replacement: string) => producerOfLeafStandardActions(atomicActions.REPLACE)({ pattern, replacement }),
    reset: () => producerOfLeafStandardActions(atomicActions.RESET)(),
    set: (key: string, value: any) => producerOfLeafStandardActions(atomicActions.SET)({ path: [key], value }),
    toggle: () => producerOfLeafStandardActions(atomicActions.TOGGLE)(),
    update: (newVal: any) => producerOfLeafStandardActions(atomicActions.UPDATE)(newVal)
  }
}

const makeProducerOfLeafStandardActions = (actionType: string | LeafActionTypeCreator = leafReducerDefaults.actionType) => {
  return (path: string[]) => (creatorKey: string) => (payload?: any): LeafStandardAction => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf = { path, creatorKey, CREATOR_KEY }
    const type = (typeof actionType === "function")
      ? actionType(leaf)
      : actionType

    return {
      leaf,
      type,
      payload
    }
  }
}

export default makeCreateDefaults