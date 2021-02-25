export interface LeafData {
  path: (string | number)[];
  creatorKey: string;
  CREATOR_KEY: string;
  custom: boolean;
  bundled?: string[];
}

export interface Action<PayloadT = unknown> {
  type: string;
  leaf: LeafData;
  payload?: PayloadT;
}

export interface ActionWithPayload<PayloadT> extends Action<PayloadT> {
  payload: PayloadT;
}

export interface BundledAction extends ActionWithPayload<RiduceAction[]> {
  leaf: LeafData & {
    bundled: string[];
  };
}

export interface CallbackAction<TreeT = unknown> {
  (treeState: TreeT): Action | BundledAction;
}

export type RiduceAction<TreeT = unknown> = Action | CallbackAction<TreeT>;

export function isBundledAction(action: Action): action is BundledAction {
  return !!action.leaf.bundled;
}

export function isCallbackAction<TreeT>(
  action: RiduceAction<TreeT>,
  treeState: TreeT
): action is CallbackAction<TreeT> {
  return typeof action === "function" && !!action(treeState)?.leaf;
}
