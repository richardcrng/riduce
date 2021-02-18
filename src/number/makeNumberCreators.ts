import makeCreatorOfTypeFromPath from "../create/makeCreatorOfTypeFromPath";
import { CreateFn } from "../types";
import { NumberCreators, NumberCreatorKeys } from "./number-types";

function makeNumberCreators<L extends number, T>(
  leafState: L,
  path: (string | number)[]
): CreateFn<NumberCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path);
  return (passedType?: string) =>
    madeNumberCreators(leafState, path, makeCreatorOfType, passedType);
}

export function madeNumberCreators<L extends number, T>(
  leafState: L,
  path: (string | number)[],
  makeCreatorOfType: ReturnType<typeof makeCreatorOfTypeFromPath>,
  passedType?: string
): NumberCreators<L, T> {
  const creatorOfType = makeCreatorOfType(passedType);
  return {
    increment: (n?) => creatorOfType(NumberCreatorKeys.INCREMENT, n),
  };
}

export default makeNumberCreators;
