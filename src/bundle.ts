import { prop } from "ramda";
import { Action, BundledAction, isCallbackAction, RiduceAction } from "./types";

function bundle<TreeT = unknown>(
  actions: RiduceAction<TreeT>[],
  type?: string
): BundledAction<TreeT> {
  const actionTypes = actions.map((action) =>
    isCallbackAction(action) ? action.name : action.type
  );

  return {
    type: type || actionTypes.join("; "),
    payload: actions,
    leaf: {
      creatorKey: "bundle",
      CREATOR_KEY: "bundle",
      custom: false,
      bundled: actionTypes,
      path: [],
    },
  };
}

export default bundle;
