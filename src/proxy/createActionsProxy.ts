import wrapWithCreate from "./wrapWithCreate";
import { RiducerDict, CreateAPI } from "../types";

export type ActionsProxy<
  LeafT,
  TreeT = LeafT,
  RiducerDictT extends RiducerDict<TreeT> = RiducerDict<TreeT>
> = {
  create: CreateAPI<LeafT, TreeT, RiducerDictT>;
} & {
  [K in keyof LeafT]: ActionsProxy<LeafT[K], TreeT, RiducerDictT>;
};

function createActionsProxy<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  riducerDict: RiducerDictT,
  path: (string | number)[] = []
): ActionsProxy<LeafT, TreeT, RiducerDictT> {
  const proxy = new Proxy(
    wrapWithCreate(leafState, treeState, riducerDict, path),
    {
      get: (target, prop: Extract<keyof LeafT, string | number> | "create") => {
        if (prop === "create") return target.create;

        return createActionsProxy(target[prop], treeState, riducerDict, [
          ...path,
          propForPath(prop),
        ]);
      },
    }
  );

  return (proxy as unknown) as ActionsProxy<LeafT, TreeT, RiducerDictT>;
}

const propForPath = (prop: string | number | Symbol): string | number =>
  isFixedString(prop) ? parseInt(String(prop)) : String(prop);

const isFixedString = (s: string | number | Symbol) => {
  const n = Number(s);
  return !isNaN(n) && isFinite(n) && !/e/i.test(String(s));
};

export default createActionsProxy;
