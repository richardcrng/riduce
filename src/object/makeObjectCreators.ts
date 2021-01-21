import makeCreatorOfTypeFromPath from "../create/makeCreatorOfTypeFromPath";
import { CreateFn } from "../types";
import { ObjectCreators, ObjectCreatorKeys } from "./object-types";

function makeObjectCreators<L extends {}, T>(
  leafState: L,
  path: (string | number)[]
): CreateFn<ObjectCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path);
  return (passedType?: string) =>
    madeObjectCreators(leafState, path, makeCreatorOfType, passedType);
}

export function madeObjectCreators<L extends {}, T>(
  leafState: L,
  path: (string | number)[],
  makeCreatorOfType: ReturnType<typeof makeCreatorOfTypeFromPath>,
  passedType?: string
): ObjectCreators<L, T> {
  const creatorOfType = makeCreatorOfType(passedType);
  return {
    assign: (props: L) => creatorOfType(ObjectCreatorKeys.ASSIGN, props),
    path: (route, value) =>
      creatorOfType(ObjectCreatorKeys.PATH, { path: route, value }),
    pushedSet: (arg: any) => creatorOfType(ObjectCreatorKeys.PUSHED_SET, arg),
    set: (key, value) => creatorOfType(ObjectCreatorKeys.SET, { key, value }),
  };
}

export default makeObjectCreators;
