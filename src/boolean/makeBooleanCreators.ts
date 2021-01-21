import makeCreatorOfTypeFromPath from "../create/makeCreatorOfTypeFromPath";
import { CreateFn } from "../types";
import { BooleanCreators, BooleanCreatorKeys } from "./boolean-types";

function makeBooleanCreators<L extends boolean, T>(
  leafState: L,
  path: (string | number)[]
): CreateFn<BooleanCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path);
  return (passedType?: string) =>
    madeBooleanCreators(leafState, path, makeCreatorOfType, passedType);
}

export function madeBooleanCreators<L extends boolean, T>(
  leafState: L,
  path: (string | number)[],
  makeCreatorOfType: ReturnType<typeof makeCreatorOfTypeFromPath>,
  passedType?: string
): BooleanCreators<L, T> {
  const creatorOfType = makeCreatorOfType(passedType);
  return {
    off: () => creatorOfType(BooleanCreatorKeys.OFF),
    on: () => creatorOfType(BooleanCreatorKeys.ON),
    toggle: () => creatorOfType(BooleanCreatorKeys.TOGGLE),
  };
}

export default makeBooleanCreators;
