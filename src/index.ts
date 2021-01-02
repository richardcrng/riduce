import riduce, { Reducer } from "./riduce";
import bundle from "./bundle";
import useRiducer from "./use-riducer";
export { Action, ActionWithPayload, ActionsProxy } from "./types";
export {
  RiducerDict,
  Riducer,
  PermissiveRiducer,
  ShorthandRiducer,
  LonghandRiducer,
} from "./types";

export default riduce;

export { bundle, Reducer, useRiducer };
