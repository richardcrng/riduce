import makeCreatorOfTypeFromPath from "../create/makeCreatorOfTypeFromPath";
import { CreateFn } from "../types";
import { ArrayCreators, ArrayCreatorKeys } from "./array-types";

function makeArrayCreators<L extends unknown[], T>(
  leafState: L,
  path: (string | number)[]
): CreateFn<ArrayCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path);
  return (passedType?: string) =>
    madeArrayCreators(leafState, path, makeCreatorOfType, passedType);
}

export function madeArrayCreators<L extends unknown[], T>(
  leafState: L,
  path: (string | number)[],
  makeCreatorOfType: ReturnType<typeof makeCreatorOfTypeFromPath>,
  passedType?: string
): ArrayCreators<L, T> {
  const creatorOfType = makeCreatorOfType(passedType);
  return {
    concat: (arr: L) => creatorOfType(ArrayCreatorKeys.CONCAT, arr),
    drop: (n) => creatorOfType(ArrayCreatorKeys.DROP, n),
    filter: (cb) => creatorOfType(ArrayCreatorKeys.FILTER, cb),
    push: (element, index, replace) =>
      creatorOfType(ArrayCreatorKeys.PUSH, { element, index, replace }),
  };
}

export default makeArrayCreators;
