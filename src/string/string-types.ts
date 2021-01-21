import { ActionWithPayload, Action } from "../types";

export enum StringCreatorKeys {
  CONCAT = "CONCAT_STR",
}

export type StringCreators<LeafT extends string = string, TreeT = unknown> = {
  concat(str: string): ActionWithPayload<string>;
};

export type StringActions<
  KeyT extends keyof StringCreators,
  LeafT extends string = string,
  TreeT = unknown
> = ReturnType<StringCreators<LeafT, TreeT>[KeyT]>;

export function isStringAction(action: Action): boolean {
  return isStringAction(action);
}

export function isConcatActionString(
  action: Action
): action is StringActions<"concat"> {
  return action.leaf.CREATOR_KEY === StringCreatorKeys.CONCAT;
}
